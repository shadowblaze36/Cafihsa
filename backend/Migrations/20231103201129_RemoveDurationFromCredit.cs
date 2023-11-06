using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cafihsa.Migrations
{
    /// <inheritdoc />
    public partial class RemoveDurationFromCredit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Credit");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "Credit",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
