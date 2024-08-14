using System;
using Microsoft.EntityFrameworkCore;
using TraderaBackend.Models;

namespace TraderaBackend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<User> Users {get; set;}

    public DbSet<UserSecurity> UserSecurity { get; set; } = default!;

    public DbSet<Status> Status { get; set; } = default!;

public DbSet<TraderaBackend.Models.AuthLog> AuthLog { get; set; } = default!;

public DbSet<TraderaBackend.Models.Account> Account { get; set; } = default!;

public DbSet<TraderaBackend.Models.Transaction> Transaction { get; set; } = default!;

}
