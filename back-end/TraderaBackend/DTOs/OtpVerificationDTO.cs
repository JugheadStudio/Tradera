public class OtpVerificationDTO
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public int UserId { get; set; }  // Add this property
    public string Otp { get; set; } // The OTP entered by the user
    public string StoredOtp { get; set; } // The OTP sent to the user's email
}
