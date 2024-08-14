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

    public DbSet<AuthLog> AuthLog { get; set; } = default!;

    public DbSet<Account> Account { get; set; } = default!;

    public DbSet<Transaction> Transaction { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.FromAccount)
            .WithMany()
            .HasForeignKey(t => t.From_account_id)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.ToAccount)
            .WithMany()
            .HasForeignKey(t => t.To_account_id)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Account>()
            .HasOne(a => a.User)
            .WithMany()
            .HasForeignKey(a => a.User_id)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Account>()
            .HasOne(a => a.AccountStatus)
            .WithMany()
            .HasForeignKey(a => a.Account_status_id)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<UserSecurity>()
            .HasOne(us => us.User)
            .WithMany()
            .HasForeignKey(us => us.User_id)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AuthLog>()
            .HasOne(al => al.User)
            .WithMany()
            .HasForeignKey(al => al.User_id)
            .OnDelete(DeleteBehavior.Cascade);
    }
}