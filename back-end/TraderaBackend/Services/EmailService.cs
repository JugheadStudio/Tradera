using PostmarkDotNet;
using System.Threading.Tasks;
public class EmailService
{
    private readonly PostmarkClient _client;
    private readonly string _fromEmail;

    public EmailService()
    {
        // Replace with your Postmark API key
        _client = new PostmarkClient(Environment.GetEnvironmentVariable("POSTMARK_API_KEY"));
        _fromEmail = "150139@virtualwindow.co.za";
    }

    public async Task SendEmailAsync(string toEmail, string subject, string plainTextContent, string htmlContent)
    {
        var message = new PostmarkMessage
        {
            From = _fromEmail,
            To = toEmail,
            Subject = subject,
            HtmlBody = htmlContent,
            TextBody = plainTextContent
        };

        await _client.SendMessageAsync(message);
    }

    public async Task SendTwoFactorCodeAsync(string toEmail, string userName, string code)
    {
        var htmlContent = $@"
        <!DOCTYPE html>
        <html lang='en'>
        <head>
          <meta charset='UTF-8'>
          <meta name='viewport' content='width=device-width, initial-scale=1.0'>
          <title>Email Template</title>
        </head>
        <body bgcolor='#EFEFEF' style='margin: 0; padding: 0; font-family: Montserrat, sans-serif;'>
          <table cellpadding='0' cellspacing='0' width='100%' style='border-collapse: collapse;'>
            <tr>
              <td align='center' style='padding: 20px; font-family: Montserrat, sans-serif;'>
                <table cellpadding='0' cellspacing='0' width='850' style='border-collapse: collapse; background-color: #ffffff;'>
                  <tr>
                    <td>
                      <img src='https://github.com/JugheadStudio/Github-assets/blob/main/Tradera/MailerHeader.png?raw=true' alt='Tradera Header Image'>
                    </td>
                  </tr>
                  <tr>
                    <td style='padding: 20px; text-align: center;'>
                      <p>Dear {userName},</p>
                      <h3>To ensure the security of your account, please use the <br> following code to complete your login:</h3>
                      <h1 style='color: #5591A9'>{code}</h1>
                      <p>This code is valid for the next 10 minutes. If you did not request this code, <br> please ignore this email or contact our support team immediately.</p>
                      <br><br>
                      <p><strong>Security Tips</strong></p>
                      <p>Do not share this code with anyone.</p>
                      <p>If you suspect any unauthorized access to your account, <br> please change your password immediately.</p>
                      <br><br>
                      <h3><strong>Thank you for helping us keep your account secure.</strong></h3>
                      <br><br>
                      <p><strong>Best Regards,</strong> <br> Tradera Support Team</p>
                      <br><br><br><br>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src='https://github.com/JugheadStudio/Github-assets/blob/main/Tradera/MailerFooter.png?raw=true' alt='Tradera Footer Image'>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>";

        await SendEmailAsync(toEmail, "Your Two-Factor Authentication Code", $"Your code is {code}", htmlContent);
    }
}
