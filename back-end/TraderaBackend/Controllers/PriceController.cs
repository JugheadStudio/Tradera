using Microsoft.AspNetCore.Mvc;
using TraderaBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using TraderaBackend.Data;

namespace TraderaBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PriceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PriceController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("hourly-prices")]
        public IActionResult GetHourlyPrices()
        {
            try
            {
                var transactions = _context.Transactions
                    .OrderBy(t => t.Timestamp)
                    .ToList();

                var prices = new List<object>();
                decimal? previousClosingPrice = null;

                DateTime currentHour = DateTime.UtcNow.Date.AddHours(DateTime.UtcNow.Hour);
                DateTime earliestHour = currentHour.AddHours(-23);

                for (DateTime hourStart = earliestHour; hourStart <= currentHour; hourStart = hourStart.AddHours(1))
                {
                    var hourEnd = hourStart.AddHours(1);

                    var hourTransactions = transactions
                        .Where(t => t.Timestamp >= hourStart && t.Timestamp < hourEnd)
                        .ToList();

                    decimal openPrice = previousClosingPrice ?? 100; // Default to 100 if no previous price
                    decimal highPrice = openPrice;
                    decimal lowPrice = openPrice;
                    decimal closePrice = openPrice;

                    foreach (var transaction in hourTransactions)
                    {
                        decimal amountChange = transaction.Amount * 0.1m;

                        if (transaction.Transaction_type == "Deposit")
                        {
                            closePrice += amountChange;
                        }
                        else if (transaction.Transaction_type == "Withdrawal")
                        {
                            closePrice -= amountChange;
                        }

                        highPrice = Math.Max(highPrice, closePrice);
                        lowPrice = Math.Min(lowPrice, closePrice);
                    }

                    previousClosingPrice = closePrice;

                    prices.Add(new
                    {
                        x = hourStart.ToString("HH:00"),
                        o = openPrice,
                        h = highPrice,
                        l = lowPrice,
                        c = closePrice
                    });
                }

                return Ok(prices);
            }
            catch (Exception ex)
            {
                // Log the exception and return a server error response
                // You might want to use a logging framework like Serilog or NLog
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
