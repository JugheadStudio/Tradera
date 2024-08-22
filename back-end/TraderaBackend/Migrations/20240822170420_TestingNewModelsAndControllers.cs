using System;
using System.Net;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TraderaBackend.Migrations
{
    /// <inheritdoc />
    public partial class TestingNewModelsAndControllers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    Status_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Status_name = table.Column<string>(type: "text", nullable: false),
                    Total_amount_criteria = table.Column<int>(type: "integer", nullable: false),
                    Transactions_criteria = table.Column<int>(type: "integer", nullable: false),
                    Annual_interest_rate = table.Column<int>(type: "integer", nullable: false),
                    Transaction_fee = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.Status_id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    User_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    Created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.User_id);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Account_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Balance = table.Column<int>(type: "integer", nullable: false),
                    Active = table.Column<bool>(type: "boolean", nullable: false),
                    User_id = table.Column<int>(type: "integer", nullable: false),
                    Account_status_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Account_id);
                    table.ForeignKey(
                        name: "FK_Accounts_Statuses_Account_status_id",
                        column: x => x.Account_status_id,
                        principalTable: "Statuses",
                        principalColumn: "Status_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Accounts_Users_User_id",
                        column: x => x.User_id,
                        principalTable: "Users",
                        principalColumn: "User_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AuthLogs",
                columns: table => new
                {
                    Log_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Login_time = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Logout_time = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Ip_address = table.Column<IPAddress>(type: "inet", nullable: false),
                    Device_info = table.Column<string>(type: "text", nullable: false),
                    User_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthLogs", x => x.Log_id);
                    table.ForeignKey(
                        name: "FK_AuthLogs_Users_User_id",
                        column: x => x.User_id,
                        principalTable: "Users",
                        principalColumn: "User_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserSecuritys",
                columns: table => new
                {
                    Security_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Password_hash = table.Column<string>(type: "text", nullable: true),
                    Latest_otp_secret = table.Column<string>(type: "text", nullable: true),
                    Updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    User_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSecuritys", x => x.Security_id);
                    table.ForeignKey(
                        name: "FK_UserSecuritys_Users_User_id",
                        column: x => x.User_id,
                        principalTable: "Users",
                        principalColumn: "User_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Transaction_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Transaction_type = table.Column<string>(type: "text", nullable: false),
                    Amount = table.Column<int>(type: "integer", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    From_account_id = table.Column<int>(type: "integer", nullable: true),
                    To_account_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Transaction_id);
                    table.ForeignKey(
                        name: "FK_Transactions_Accounts_From_account_id",
                        column: x => x.From_account_id,
                        principalTable: "Accounts",
                        principalColumn: "Account_id");
                    table.ForeignKey(
                        name: "FK_Transactions_Accounts_To_account_id",
                        column: x => x.To_account_id,
                        principalTable: "Accounts",
                        principalColumn: "Account_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_Account_status_id",
                table: "Accounts",
                column: "Account_status_id");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_User_id",
                table: "Accounts",
                column: "User_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AuthLogs_User_id",
                table: "AuthLogs",
                column: "User_id");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_From_account_id",
                table: "Transactions",
                column: "From_account_id");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_To_account_id",
                table: "Transactions",
                column: "To_account_id");

            migrationBuilder.CreateIndex(
                name: "IX_UserSecuritys_User_id",
                table: "UserSecuritys",
                column: "User_id",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuthLogs");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "UserSecuritys");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
