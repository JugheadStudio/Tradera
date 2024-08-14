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
    public class AuthLogController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthLogController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/AuthLog
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuthLog>>> GetAuthLog()
        {
            return await _context.AuthLog.ToListAsync();
        }

        // GET: api/AuthLog/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AuthLog>> GetAuthLog(int id)
        {
            var authLog = await _context.AuthLog.FindAsync(id);

            if (authLog == null)
            {
                return NotFound();
            }

            return authLog;
        }

        // POST: api/AuthLog
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AuthLog>> PostAuthLog(AuthLog authLog)
        {
            _context.AuthLog.Add(authLog);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAuthLog", new { id = authLog.Log_id }, authLog);
        }

        private bool AuthLogExists(int id)
        {
            return _context.AuthLog.Any(e => e.Log_id == id);
        }
    }
}
