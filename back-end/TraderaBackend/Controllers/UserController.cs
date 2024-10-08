using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TraderaBackend.Data;
using TraderaBackend.DTOs;
using TraderaBackend.Models;
using System.Security.Cryptography;


namespace TraderaBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly ILogger<UserController> _logger;

        private readonly EmailService _emailService; // Declare EmailService

        public UserController(AppDbContext context, ILogger<UserController> logger, EmailService emailService)
        {
            _context = context;
            _logger = logger;
            _emailService = emailService; // Assign injected EmailService to the field
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            // Eagerly load related Account and Status data
            var users = await _context.Users
                .Include(u => u.Account) // Load related Account
                .ThenInclude(a => a.Status) // Load related Status
                .ToListAsync();

            // Map the result to UserDTOs
            var userDtos = users.Select(user => new UserDTO
            {
                Username = user.Username,
                Email = user.Email,
                AccountStatus = user.Account?.Status?.Status_name, 
                Active = user.Account?.Active,
                Role = user.Role
            }).ToList();

            return Ok(userDtos);
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        // Updated to use UserUpdateDto for receiving user data from the frontend.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserUpdateDto updateUserDto)
        {
            
            if (id != updateUserDto.UserId)
            {
                return BadRequest("User ID mismatch.");
            }

            
            var user = await _context.Users
                                     .Include(u => u.UserSecurity)
                                     .FirstOrDefaultAsync(u => u.User_id == id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            
            user.Username = updateUserDto.Username;
            user.Email = updateUserDto.Email;

            
            if (!string.IsNullOrEmpty(updateUserDto.Password))
            {
                user.UserSecurity.Password_hash = HashPassword(updateUserDto.Password);
                user.UserSecurity.Updated_at = DateTime.UtcNow;
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound("User no longer exists.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // Signup
        // New: Initiate the signup process by generating an OTP and sending it via email
        [HttpPost("initiate-signup")]
        public async Task<ActionResult> InitiateSignup(UserDTO userDto)
        {
            try
            {
                var otpCode = GenerateOtpCode(); // Generate the OTP code

                // Use the injected EmailService to send the OTP
                await _emailService.SendTwoFactorCodeAsync(userDto.Email, userDto.Username, otpCode);

                // Return OTP and user data to the client for further processing
                return Ok(new { Email = userDto.Email, Username = userDto.Username, OtpCode = otpCode });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to initiate signup for Email: {Email}", userDto.Email);
                return StatusCode(500, "Internal Server Error: " + ex.Message);
            }
        }
        [HttpPost("verify-otp-and-create-user")]
        public async Task<ActionResult<User>> VerifyOtpAndCreateUser(OtpVerificationDTO otpDto)
        {
            // Verify if the provided OTP matches the one sent to the user's email
            if (otpDto.Otp != otpDto.StoredOtp)
            {
                return Unauthorized("Invalid OTP.");
            }

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Create the user after OTP is verified
                var user = new User
                {
                    Username = otpDto.Username,
                    Email = otpDto.Email,
                    Role = "User",
                    Created_at = DateTime.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var userSecurity = new UserSecurity
                {
                    Password_hash = HashPassword(otpDto.Password),
                    Latest_otp_secret = null, // OTP has been used, clear it
                    Updated_at = DateTime.UtcNow,
                    User_id = user.User_id
                };

                _context.UserSecuritys.Add(userSecurity);
                await _context.SaveChangesAsync();

                var account = new Account
                {
                    Balance = 0,
                    Active = true,
                    User_id = user.User_id,
                    Account_status_id = 1
                };

                _context.Accounts.Add(account);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                _logger.LogInformation("User created successfully with ID {UserId}", user.User_id);

                return CreatedAtAction(nameof(GetUser), new { id = user.User_id }, user);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError(ex, "Failed to create user with Email: {Email}", otpDto.Email);
                return StatusCode(500, "Internal Server Error: " + ex.Message);
            }
        }

        // Helper methods (unchanged)
        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private string GenerateOtpCode()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString(); // Generate a 6-digit OTP code
        }

        // Login
        // POST: api/User/authenticate
        [HttpPost("authenticate")]
        public async Task<ActionResult<User>> AuthenticateUser(UserLoginDTO userDto)
        {
            if (userDto == null)
            {
                _logger.LogError("Received null UserLoginDTO");
                return BadRequest("Invalid user data");
            }

            var user = await _context.Users
                                    .Include(u => u.UserSecurity)
                                    .FirstOrDefaultAsync(u => u.Email == userDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.UserSecurity?.Password_hash))
            {
                return Unauthorized("Invalid credentials");
            }

            // Convert IPAddress to string
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();

            // Capture login time, IP address, and device info
            var authLog = new AuthLog
            {
                User_id = user.User_id,
                User = user,
                Login_time = DateTime.UtcNow,
                Ip_address = ipAddress, // Store as string
                Device_info = Request.Headers["User-Agent"].ToString()
            };

            try
            {
                _context.AuthLogs.Add(authLog);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving AuthLog entry for user {UserId}", user.User_id);
                return StatusCode(500, "Internal Server Error: " + ex.Message);
            }

            return Ok(user);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> LogoutUser([FromBody] int userId)
        {
            // Find the most recent AuthLog entry for the user
            var authLog = await _context.AuthLogs
                                        .Where(log => log.User_id == userId)
                                        .OrderByDescending(log => log.Login_time)
                                        .FirstOrDefaultAsync();

            if (authLog == null)
            {
                _logger.LogWarning("No active login found for user {UserId}", userId);
                return NotFound("No active login found for this user.");
            }

            // Update the Logout_time with the current time
            authLog.Logout_time = DateTime.UtcNow;

            try
            {
                _context.AuthLogs.Update(authLog);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Logout time recorded for user {UserId}", userId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating logout time for user {UserId}", userId);
                return StatusCode(500, "Internal Server Error: " + ex.Message + " - " + ex.InnerException?.Message);
            }

            return Ok("User logged out successfully.");
        }




        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.User_id == id);
        }
    }
}
