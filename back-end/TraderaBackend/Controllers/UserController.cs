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

        public UserController(AppDbContext context, ILogger<UserController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.User_id)
            {
                return BadRequest();
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
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST a new user: api/User
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(UserDTO userDto)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var user = new User
                {
                    Username = userDto.Username,
                    Email = userDto.Email,
                    Role = "Traveler",
                    Created_at = DateTime.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var userSecurity = new UserSecurity
                {
                    Password_hash = HashPassword(userDto.Password),
                    Latest_otp_secret = GenerateOtpSecret(),
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
                catch (DbUpdateException ex)
                {
                    await transaction.RollbackAsync();
                    _logger.LogError(ex, "Database update failed for User: {Email}", userDto.Email);
                    return StatusCode(500, "Database update failed: " + ex.InnerException?.Message);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    _logger.LogError(ex, "Failed to create user with Email: {Email}", userDto.Email);
                    return StatusCode(500, "Internal Server Error: " + ex.Message);
                }
        }


        // Helper methods (implement these methods according to your requirements)
        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }


        private string GenerateOtpSecret()
        {
            byte[] tokenData = new byte[16]; // 128 bits
            RandomNumberGenerator.Fill(tokenData); // Fill the buffer with random bytes
            return Convert.ToBase64String(tokenData); // Convert to base64 for easier handling and storage
        }

        // POST: api/User/Authenticate
        [HttpPost("authenticate")]
        public async Task<ActionResult<User>> AuthenticateUser(UserLoginDTO userDto)
        {
            if (userDto == null)
            {
                _logger.LogError("Received null UserLoginDTO");
                return BadRequest("Invalid user data");
            }

            var user = await _context.Users
                                    .Include(u => u.UserSecurity) // Ensure related data is loaded
                                    .FirstOrDefaultAsync(u => u.Email == userDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.UserSecurity?.Password_hash))
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(user);
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
