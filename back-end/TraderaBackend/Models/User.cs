using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraderaBackend.Models;

//user entitiy refering to our user table
public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int User_id {get; set;}

    [Required]
    public string? Username {get; set;} = string.Empty;

    [Required]
    public string? Email {get; set;} = string.Empty;

    [Required]
    public string Role { get; set; } = "normal"; // Default role is "normal"

    [Required]
    public required DateTime Created_at {get; set;}

    [Required]
    public bool IsFrozen {get; set;}

    //Navigation property
    public UserSecurity? UserSecurity {get; set;}
    public Account? Account {get; set;}
    public ICollection<AuthLog>? AuthLogs {get; set;}

}
