using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TraderaBackend.Migrations
{
    /// <inheritdoc />
    public partial class RandAmountAddedToTransactions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<int>(
                name: "RandAmount",
                table: "Transactions",
                type: "integer",
                nullable: false,
                defaultValue: 0);

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RandAmount",
                table: "Transactions");


        }
    }
}
