using System;
using Microsoft.EntityFrameworkCore;
using TraderaBackend.Models;

namespace TraderaBackend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    // All endpoint controllers
    public DbSet<User> Users { get; set; }
    public DbSet<UserSecurity> UserSecuritys { get; set; }
    public DbSet<Status> Statuses { get; set; }
    public DbSet<AuthLog> AuthLogs { get; set; }
    public DbSet<Account> Accounts { get; set; }
    public DbSet<Transaction> Transactions { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User and User security (1-1)
        modelBuilder.Entity<UserSecurity>()
            .HasOne(us => us.User)
            .WithOne(u => u.UserSecurity)
            .HasForeignKey<UserSecurity>(us => us.User_id);

        // User and Auth log (many-1)
        modelBuilder.Entity<AuthLog>()
            .HasOne(a => a.User)
            .WithMany(u => u.AuthLogs)
            .HasForeignKey(a => a.User_id);

        // User and Account (1-1)
        modelBuilder.Entity<Account>()
            .HasOne(a => a.User)
            .WithOne(u => u.Account)
            .HasForeignKey<Account>(a => a.User_id);

        // Account and Transaction (1-many for FromAccount)
        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.FromAccount)
            .WithMany(a => a.FromTransactions) // Maps to FromTransactions
            .HasForeignKey(t => t.From_account_id);

        // Account and Transaction (1-many for ToAccount)
        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.ToAccount)
            .WithMany(a => a.ToTransactions) // Maps to ToTransactions
            .HasForeignKey(t => t.To_account_id);

        // Account and Status (many-1)
        modelBuilder.Entity<Account>()
            .HasOne(a => a.Status)
            .WithMany(s => s.Accounts)
            .HasForeignKey(a => a.Account_status_id);
    }


    
}