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
    public class TransactionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Transaction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransaction()
        {
            return await _context.Transaction.ToListAsync();
        }

        // GET: api/Transaction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(int id)
        {
            var transaction = await _context.Transaction.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            return transaction;
        }

        // TRANSFER: api/Transaction/transfer
        [HttpPost("transfer")]
        public async Task<IActionResult> TransferFunds(int fromAccountId, int toAccountId, int amount)
        {
            if (amount <= 0)
            {
                return BadRequest("Transfer amount must be greater than zero.");
            }

            var fromAccount = await _context.Account.FindAsync(fromAccountId);
            var toAccount = await _context.Account.FindAsync(toAccountId);

            if (fromAccount == null || toAccount == null)
            {
                return NotFound("One or both accounts not found.");
            }

            if (fromAccount.Balance < amount)
            {
                return BadRequest("Insufficient funds in the source account.");
            }

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    fromAccount.Balance -= amount;
                    toAccount.Balance += amount;

                    var newTransaction = new Transaction
                    {
                        From_account_id = fromAccountId,
                        To_account_id = toAccountId,
                        Amount = amount,
                        Timestamp = DateTime.UtcNow,
                        Transaction_type = "Transfer"
                    };

                    _context.Transaction.Add(newTransaction);
                    await _context.SaveChangesAsync();

                    await transaction.CommitAsync();
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }

            return Ok("Transfer successful.");
        }

        // DEPOSIT: api/Transaction/deposit
        [HttpPost("deposit")]
        public async Task<IActionResult> DepositFunds(int accountId, int amount)
        {
            if (amount <= 0)
            {
                return BadRequest("Deposit amount must be greater than zero.");
            }

            var account = await _context.Account.FindAsync(accountId);

            if (account == null)
            {
                return NotFound("Account not found.");
            }

            account.Balance += amount;

            var newTransaction = new Transaction
            {
                From_account_id = accountId,
                To_account_id = accountId,
                Amount = amount,
                Timestamp = DateTime.UtcNow,
                Transaction_type = "Deposit"
            };

            _context.Transaction.Add(newTransaction);
            await _context.SaveChangesAsync();

            return Ok("Deposit successful.");
        }

        // WITHDRAW: api/Transaction/withdraw
        [HttpPost("withdraw")]
        public async Task<IActionResult> WithdrawFunds(int accountId, int amount)
        {
            if (amount <= 0)
            {
                return BadRequest("Withdrawal amount must be greater than zero.");
            }

            var account = await _context.Account.FindAsync(accountId);

            if (account == null)
            {
                return NotFound("Account not found.");
            }

            if (account.Balance < amount)
            {
                return BadRequest("Insufficient funds in the account.");
            }

            account.Balance -= amount;

            var newTransaction = new Transaction
            {
                From_account_id = accountId,
                To_account_id = accountId,
                Amount = amount,
                Timestamp = DateTime.UtcNow,
                Transaction_type = "Withdrawal"
            };

            _context.Transaction.Add(newTransaction);
            await _context.SaveChangesAsync();

            return Ok("Withdrawal successful.");
        }

        private bool TransactionExists(int id)
        {
            return _context.Transaction.Any(e => e.Transaction_id == id);
        }
    }
}
