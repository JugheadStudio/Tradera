using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraderaBackend.Models;

public class Account
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Account_id { get; set; }

    [Required]
    public int User_id { get; set; }

    [Required]
    public int Account_status_id { get; set; }

    public int Balance { get; set; }

    public bool Active { get; set; }

    // Navigation properties
    [ForeignKey("User_id")]
    public virtual User? User { get; set; }

    [ForeignKey("Account_status_id")]
    public virtual Status? AccountStatus { get; set; }
}