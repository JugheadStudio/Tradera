using System.ComponentModel.DataAnnotations;

namespace TraderaBackend.DTOs;

public class UserDTO
{
    [Required]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    public string? AccountStatus { get; set; }

    public bool? Active { get; set; }

    public string Role { get; set; } = string.Empty;

}
