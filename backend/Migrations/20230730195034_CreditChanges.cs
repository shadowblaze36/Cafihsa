using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CreditBoss.Migrations
{
    /// <inheritdoc />
    public partial class CreditChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Credit",
                newName: "InitialAmount");

            migrationBuilder.AddColumn<decimal>(
                name: "CurrentAmount",
                table: "Credit",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentAmount",
                table: "Credit");

            migrationBuilder.RenameColumn(
                name: "InitialAmount",
                table: "Credit",
                newName: "Amount");
        }
    }
}
