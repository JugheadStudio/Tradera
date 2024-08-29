using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraderaBackend.Models;

public class Account
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Account_id { get; set; }

    public int Balance { get; set; }

    public int RandBalance { get; set; }

    public bool Active { get; set; }

    // Foreign keys
    public required int User_id { get; set; }
    public required int Account_status_id { get; set; }

    // Navigation properties
    public User? User { get; set; }
    public Status? Status { get; set; }

    // Updated navigation properties
    public ICollection<Transaction>? FromTransactions { get; set; } // Transactions where this account is the sender
    public ICollection<Transaction>? ToTransactions { get; set; }   // Transactions where this account is the receiver
}
