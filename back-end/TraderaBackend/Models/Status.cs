using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TraderaBackend.Models;

public class Status
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Status_id {get; set;}

    public string Status_name {get; set;} = string.Empty;

    public int Total_amount_criteria {get; set;}

    public int Transactions_criteria {get; set;}

    public int Annual_interest_rate {get; set;}

    public int Transaction_fee {get; set;}

    // Navigation properties
    public ICollection<Account>? Accounts {get; set;}

   
}
