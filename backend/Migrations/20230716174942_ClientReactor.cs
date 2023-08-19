using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CreditBoss.Migrations
{
    /// <inheritdoc />
    public partial class ClientReactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Client",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "References",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientId = table.Column<int>(type: "int", nullable: false),
                    PersonalName1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PersonalPhone1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PersonalName2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PersonalPhone2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorkName1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorkPhone1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorkName2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorkPhone2 = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_References", x => x.Id);
                    table.ForeignKey(
                        name: "FK_References_Client_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Client",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientId = table.Column<int>(type: "int", nullable: false),
                    Workplace = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Workphone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BossName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BossPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    WorkAddress = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkDetails_Client_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Client",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_References_ClientId",
                table: "References",
                column: "ClientId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkDetails_ClientId",
                table: "WorkDetails",
                column: "ClientId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "References");

            migrationBuilder.DropTable(
                name: "WorkDetails");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Client",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
