using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraderaBackend.Models;

public class Transaction
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Transaction_id { get; set; }

    public string Transaction_type { get; set; } = string.Empty;

    [Required]
    public int From_account_id { get; set; }

    [Required]
    public int To_account_id { get; set; }

    public int Amount { get; set; }

    public required DateTime Timestamp { get; set; }

    // Navigation properties
    [ForeignKey("From_account_id")]
    public virtual Account? FromAccount { get; set; }

    [ForeignKey("To_account_id")]
    public virtual Account? ToAccount { get; set; }
}
