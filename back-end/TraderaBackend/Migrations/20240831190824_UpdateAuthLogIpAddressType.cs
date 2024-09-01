using System.Net;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TraderaBackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAuthLogIpAddressType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Ip_address",
                table: "AuthLogs",
                type: "text",
                nullable: false,
                oldClrType: typeof(IPAddress),
                oldType: "inet");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<IPAddress>(
                name: "Ip_address",
                table: "AuthLogs",
                type: "inet",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
