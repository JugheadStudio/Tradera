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

    public string Username {get; set;} = string.Empty;

    public required string Email {get; set;}

     public string Role {get; set;} = string.Empty;

    public required DateTime Created_at {get; set;}

}
