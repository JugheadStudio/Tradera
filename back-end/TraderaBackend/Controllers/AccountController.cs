using Microsoft.Extensions.Logging; // Added using statement for ILogger
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TraderaBackend.Data;
using TraderaBackend.Models;

namespace TraderaBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AccountController> _logger;

        public AccountController(AppDbContext context, ILogger<AccountController> logger) // Fixed logger assignment
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Account
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            return await _context.Accounts.ToListAsync();
        }

        // GET: api/Account/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // Find account by user_id
        [HttpGet("ByUserId/{user_id}")]
        public async Task<ActionResult<Account>> GetAccountByUserId(int user_id)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.User_id == user_id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // PUT: api/Account/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(int id, Account account)
        {
            if (id != account.Account_id)
            {
                return BadRequest();
            }

            var existingAccount = await _context.Accounts.AsNoTracking().FirstOrDefaultAsync(a => a.Account_id == id);
            if (existingAccount == null)
            {
                return NotFound();
            }

            // If needed, manually update the tracked entity
            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
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

        // Upgrade account status to the next level
        [HttpPut("Upgrade/{id}")]
        public async Task<IActionResult> UpgradeAccount(int id)
        {
            // Retrieve the account from the database
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            // Check if the account status id is not 4 before upgrading
            if (account.Account_status_id < 4)
            {
                account.Account_status_id += 1; // Increment the account status id

                _context.Entry(account).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                    return NoContent(); // Return success response if upgrade was successful
                }
                catch (DbUpdateConcurrencyException)
                {
                    throw;
                }
            }

            return NoContent(); // Return success response if the status was not incremented because it's already 4
        }


        // POST: api/Account
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccount", new { id = account.Account_id }, account);
        }

        // DELETE: api/Account/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Account/Freeze/5
        [HttpPost("Freeze/{user_id}")]
        public async Task<IActionResult> FreezeAccount(int user_id)
        {
            var account = await _context.Accounts.AsNoTracking().FirstOrDefaultAsync(a => a.User_id == user_id);
            if (account == null)
            {
                return NotFound();
            }

            account.Active = false;
            _context.Entry(account).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            _logger.LogInformation("User with ID {UserId} has been frozen.", user_id);

            return NoContent();
        }

        // POST: api/Account/Unfreeze/5
        [HttpPost("Unfreeze/{user_id}")]
        public async Task<IActionResult> UnfreezeAccount(int user_id)
        {
            var account = await _context.Accounts.AsNoTracking().FirstOrDefaultAsync(a => a.User_id == user_id);
            if (account == null)
            {
                return NotFound();
            }

            account.Active = true;
            _context.Entry(account).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            _logger.LogInformation("User with ID {UserId} has been unfrozen.", user_id);

            return NoContent();
        }

        private bool AccountExists(int id)
        {
            return _context.Accounts.Any(e => e.Account_id == id);
        }
    }
}
