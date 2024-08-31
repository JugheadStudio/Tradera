using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TraderaBackend.Data;
using TraderaBackend.Models;

namespace TraderaBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Transaction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            return await _context.Transactions.ToListAsync();
        }

        // GET: api/Transaction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            return transaction;
        }

        //get all transactions from a specific user
        // GET: api/Transaction/user/{accountId}
        [HttpGet("User/{accountId}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactionsForUser(int accountId)
        {
            var transactions = await _context.Transactions
                .Where(t => t.From_account_id == accountId || t.To_account_id == accountId)
                .ToListAsync();

            if (transactions == null || transactions.Count == 0)
            {
                return NotFound();
            }

            return Ok(transactions);
        }



        // Deposit function for the Rands
        // POST: api/Transaction/Deposit
        [HttpPost("Deposit")]
        public async Task<IActionResult> Deposit(int accountId, int amount)
        {
            var account = await _context.Accounts.FindAsync(accountId);

            if (account == null)
            {
                return NotFound();
            }

            account.RandBalance += amount;

            _context.Entry(account).State = EntityState.Modified;

            // Create the transaction
            var transaction = new Transaction
            {
                //Rand amount is for zar
                //Amount is for eons
                RandAmount = amount,
                Amount = 0,
                Transaction_type = "Deposit",
                Timestamp = DateTime.UtcNow, // Use UTC now
                FromAccount = null, // No FromAccount for a deposit
                ToAccount = account  // The account receiving the deposit
            };

            _context.Transactions.Add(transaction);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(accountId))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest("Concurrency exception occurred");
                }
            }

            return NoContent();
        }

        // Withdraw function for the Rands
        // POST: api/Transaction/Withdraw
        [HttpPost("Withdraw")]
        public async Task<IActionResult> Withdraw(int accountId, int amount)
        {
            var account = await _context.Accounts.FindAsync(accountId);

            if (account == null)
            {
                return NotFound();
            }

            if (account.Balance < amount)
            {
                return BadRequest("Insufficient balance");
            }

            account.RandBalance -= amount;

            _context.Entry(account).State = EntityState.Modified;

            // Create the transaction
            var transaction = new Transaction
            {
                //Rand amount is for zar
                //Amount is for eons
                RandAmount = amount,
                Amount = 0,
                Transaction_type = "Withdrawal",
                Timestamp = DateTime.UtcNow, // Use UTC now
                FromAccount = account,  // The account from which the funds are withdrawn
                ToAccount = null        // No ToAccount for a withdrawal
            };

            _context.Transactions.Add(transaction);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(accountId))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest("Concurrency exception occurred");
                }
            }

            return NoContent();
        }

        // |||||EONS functionality|||||
        // Buy
        // POST: api/Transaction/Buy
        [HttpPost("Buy")]
        public async Task<IActionResult> Buy(int accountId, int randAmount, int eonAmount)
        {
            var account = await _context.Accounts.FindAsync(accountId);

            if (account == null)
            {
                return NotFound();
            }

            account.RandBalance -= randAmount;
            account.Balance += eonAmount;

            _context.Entry(account).State = EntityState.Modified;

            // Create the transaction
            var transaction = new Transaction
            {
                //Rand amount is for zar
                //Amount is for eons
                Amount = eonAmount,
                RandAmount = randAmount,
                Transaction_type = "Buy",
                Timestamp = DateTime.UtcNow, // Use UTC now
                FromAccount = null, // No FromAccount for buying
                ToAccount = account  // The account receiving the deposit
            };

            _context.Transactions.Add(transaction);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(accountId))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest("Concurrency exception occurred");
                }
            }

            return NoContent();
        }

        // Sell
        // POST: api/Transaction/Sell
        [HttpPost("Sell")]
        public async Task<IActionResult> Sell(int accountId, int randAmount, int eonAmount)
        {
            var account = await _context.Accounts.FindAsync(accountId);

            if (account == null)
            {
                return NotFound();
            }

            account.RandBalance += randAmount;
            account.Balance -= eonAmount;

            _context.Entry(account).State = EntityState.Modified;

            // Create the transaction
            var transaction = new Transaction
            {
                //Rand amount is for zar
                //Amount is for eons
                Amount = eonAmount,
                RandAmount = randAmount,
                Transaction_type = "Sell",
                Timestamp = DateTime.UtcNow, // Use UTC now
                FromAccount = account, // No FromAccount for buying
                ToAccount = null  // The account receiving the deposit
            };

            _context.Transactions.Add(transaction);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(accountId))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest("Concurrency exception occurred");
                }
            }

            return NoContent();
        }

        // Transfer Eons
        // POST: api/Transaction/Transfer
        [HttpPost("Transfer")]
        public async Task<IActionResult> Transfer(int fromAccountId, int toAccountId, int amount)
        {
            var fromAccount = await _context.Accounts.FindAsync(fromAccountId);
            var toAccount = await _context.Accounts.FindAsync(toAccountId);

            if (fromAccount == null || toAccount == null)
            {
                return NotFound("One or both accounts not found");
            }

            if (fromAccount.Balance < amount)
            {
                return BadRequest("Insufficient balance in the source account");
            }

            // Update balances
            fromAccount.Balance -= amount;
            toAccount.Balance += amount;

            _context.Entry(fromAccount).State = EntityState.Modified;
            _context.Entry(toAccount).State = EntityState.Modified;

            // Create the transaction
            var transaction = new Transaction
            {
                //Rand amount is for zar
                //Amount is for eons
                RandAmount = 0,
                Amount = amount,
                Transaction_type = "Transfer",
                Timestamp = DateTime.UtcNow, // Use UTC now
                FromAccount = fromAccount,  // The source account
                ToAccount = toAccount       // The destination account
            };

            _context.Transactions.Add(transaction);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(fromAccountId) || !AccountExists(toAccountId))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest("Concurrency exception occurred");
                }
            }

            return NoContent();
        }

        private bool TransactionExists(int id)
        {
            return _context.Transactions.Any(e => e.Transaction_id == id);
        }

        private bool AccountExists(int id)
        {
            return _context.Accounts.Any(e => e.Account_id == id);
        }
    }
}
