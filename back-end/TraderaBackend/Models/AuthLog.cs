using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;

namespace TraderaBackend.Models;

public class AuthLog
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Log_id { get; set; }

    public DateTime Login_time { get; set; }

    public DateTime Logout_time { get; set; }

    public required string Ip_address { get; set; }

    public required string Device_info { get; set; }

    //Foreign key
    public int User_id {get; set;}

    //Navigation property
    public required User User {get; set;}
}
