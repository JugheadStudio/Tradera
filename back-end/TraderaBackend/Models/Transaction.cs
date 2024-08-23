using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraderaBackend.Models;

public class Transaction
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Transaction_id { get; set; }

    [Required]
    public string Transaction_type { get; set; } = string.Empty;

    [Required]
    public int Amount { get; set; }

    [Required]
    public DateTime Timestamp { get; set; }

    // Nullable foreign keys for transactions
    public int? From_account_id { get; set; }
    public int? To_account_id { get; set; }

    // Nullable navigation properties
    public Account? FromAccount { get; set; }
    public Account? ToAccount { get; set; }
}
