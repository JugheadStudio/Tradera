﻿// <auto-generated />
using System;
using System.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using TraderaBackend.Data;

#nullable disable

namespace TraderaBackend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240826195614_OTPConection")]
    partial class OTPConection
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("TraderaBackend.Models.Account", b =>
                {
                    b.Property<int>("Account_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Account_id"));

                    b.Property<int>("Account_status_id")
                        .HasColumnType("integer");

                    b.Property<bool>("Active")
                        .HasColumnType("boolean");

                    b.Property<int>("Balance")
                        .HasColumnType("integer");

                    b.Property<int>("User_id")
                        .HasColumnType("integer");

                    b.HasKey("Account_id");

                    b.HasIndex("Account_status_id");

                    b.HasIndex("User_id")
                        .IsUnique();

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("TraderaBackend.Models.AuthLog", b =>
                {
                    b.Property<int>("Log_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Log_id"));

                    b.Property<string>("Device_info")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<IPAddress>("Ip_address")
                        .IsRequired()
                        .HasColumnType("inet");

                    b.Property<DateTime>("Login_time")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("Logout_time")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("User_id")
                        .HasColumnType("integer");

                    b.HasKey("Log_id");

                    b.HasIndex("User_id");

                    b.ToTable("AuthLogs");
                });

            modelBuilder.Entity("TraderaBackend.Models.Status", b =>
                {
                    b.Property<int>("Status_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Status_id"));

                    b.Property<int>("Annual_interest_rate")
                        .HasColumnType("integer");

                    b.Property<string>("Status_name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Total_amount_criteria")
                        .HasColumnType("integer");

                    b.Property<int>("Transaction_fee")
                        .HasColumnType("integer");

                    b.Property<int>("Transactions_criteria")
                        .HasColumnType("integer");

                    b.HasKey("Status_id");

                    b.ToTable("Statuses");
                });

            modelBuilder.Entity("TraderaBackend.Models.Transaction", b =>
                {
                    b.Property<int>("Transaction_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Transaction_id"));

                    b.Property<int>("Amount")
                        .HasColumnType("integer");

                    b.Property<int?>("From_account_id")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("To_account_id")
                        .HasColumnType("integer");

                    b.Property<string>("Transaction_type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Transaction_id");

                    b.HasIndex("From_account_id");

                    b.HasIndex("To_account_id");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("TraderaBackend.Models.User", b =>
                {
                    b.Property<int>("User_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("User_id"));

                    b.Property<DateTime>("Created_at")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("User_id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("TraderaBackend.Models.UserSecurity", b =>
                {
                    b.Property<int>("Security_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Security_id"));

                    b.Property<string>("Latest_otp_secret")
                        .HasColumnType("text");

                    b.Property<string>("Password_hash")
                        .HasColumnType("text");

                    b.Property<DateTime>("Updated_at")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("User_id")
                        .HasColumnType("integer");

                    b.HasKey("Security_id");

                    b.HasIndex("User_id")
                        .IsUnique();

                    b.ToTable("UserSecuritys");
                });

            modelBuilder.Entity("TraderaBackend.Models.Account", b =>
                {
                    b.HasOne("TraderaBackend.Models.Status", "Status")
                        .WithMany("Accounts")
                        .HasForeignKey("Account_status_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TraderaBackend.Models.User", "User")
                        .WithOne("Account")
                        .HasForeignKey("TraderaBackend.Models.Account", "User_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Status");

                    b.Navigation("User");
                });

            modelBuilder.Entity("TraderaBackend.Models.AuthLog", b =>
                {
                    b.HasOne("TraderaBackend.Models.User", "User")
                        .WithMany("AuthLogs")
                        .HasForeignKey("User_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("TraderaBackend.Models.Transaction", b =>
                {
                    b.HasOne("TraderaBackend.Models.Account", "FromAccount")
                        .WithMany("FromTransactions")
                        .HasForeignKey("From_account_id");

                    b.HasOne("TraderaBackend.Models.Account", "ToAccount")
                        .WithMany("ToTransactions")
                        .HasForeignKey("To_account_id");

                    b.Navigation("FromAccount");

                    b.Navigation("ToAccount");
                });

            modelBuilder.Entity("TraderaBackend.Models.UserSecurity", b =>
                {
                    b.HasOne("TraderaBackend.Models.User", "User")
                        .WithOne("UserSecurity")
                        .HasForeignKey("TraderaBackend.Models.UserSecurity", "User_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("TraderaBackend.Models.Account", b =>
                {
                    b.Navigation("FromTransactions");

                    b.Navigation("ToTransactions");
                });

            modelBuilder.Entity("TraderaBackend.Models.Status", b =>
                {
                    b.Navigation("Accounts");
                });

            modelBuilder.Entity("TraderaBackend.Models.User", b =>
                {
                    b.Navigation("Account");

                    b.Navigation("AuthLogs");

                    b.Navigation("UserSecurity");
                });
#pragma warning restore 612, 618
        }
    }
}
