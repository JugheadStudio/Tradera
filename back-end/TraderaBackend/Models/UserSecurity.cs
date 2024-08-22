using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraderaBackend.Models;

public class UserSecurity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Security_id { get; set; }

    public string? Password_hash { get; set; } = string.Empty;

    public required string? Latest_otp_secret { get; set; }

    public required DateTime Updated_at { get; set; }

    // foreign key
    public required int User_id {get; set;}

    //navigation property
    public User? User {get; set;}
}
