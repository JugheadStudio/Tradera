using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

public class EmailController : Controller
{
    private readonly EmailService _emailService;

    public EmailController()
    {
        _emailService = new EmailService();
    }

    [HttpPost("/send-two-factor-code")]
    public async Task<IActionResult> SendTwoFactorCode(string toEmail, string userName, string code)
    {
        if (string.IsNullOrEmpty(toEmail) || string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(code))
        {
            return BadRequest("Invalid parameters.");
        }

        await _emailService.SendTwoFactorCodeAsync(toEmail, userName, code);

        return Ok("Two-factor authentication email sent!");
    }
}
