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

    [Required]
    public int User_id { get; set; }

    public DateTime Login_time { get; set; }

    public DateTime Logout_time { get; set; }

    public required IPAddress Ip_address { get; set; }

    public required string Device_info { get; set; }

    // Navigation properties
    [ForeignKey("User_id")]
    public virtual User? User { get; set; }
}
