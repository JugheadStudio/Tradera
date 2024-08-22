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

namespace TraderaBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
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
            // Generate a new User entity
            var user = new User
            {
                Username = userDto.Username,
                Email = userDto.Email,
                Role = "User", // Default role, you can change this as needed
                Created_at = DateTime.UtcNow // Set the current time as Created_at
            };

            // Add the User entity to the context and save it to generate User_id
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Generate a new UserSecurity entity
            var userSecurity = new UserSecurity
            {
                Password_hash = HashPassword(userDto.Password), // Password stored as is for now
                Latest_otp_secret = GenerateOtpSecret(), // Generate OTP secret, replace this with your logic
                Updated_at = DateTime.UtcNow, // Set the current time as Updated_at
                User_id = user.User_id // Set the generated User_id
            };

            // Associate the UserSecurity entity with the User entity
            user.UserSecurity = userSecurity;

            // Add the UserSecurity entity to the context
            _context.UserSecuritys.Add(userSecurity);

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Generate a new Account entity
            var account = new Account
            {
                Balance = 0,
                Active = true,
                User_id = user.User_id, 
                Account_status_id = 1,
            };

            // Associate the UserSecurity entity with the User entity
            user.Account = account;

            // Add the UserSecurity entity to the context
            _context.Accounts.Add(account);

            // Save changes to the database
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.User_id }, user);
        }


        // Helper methods (implement these methods according to your requirements)
        private string HashPassword(string password)
        {
            // For now, return the password as is. 
            // Make sure to replace this with proper hashing later.
            return password;
        }


        private string GenerateOtpSecret()
        {
            // Implement your OTP secret generation logic here
            return Guid.NewGuid().ToString(); // Example using a GUID
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
