using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CreditBoss.Migrations
{
    /// <inheritdoc />
    public partial class InitialModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isActive",
                table: "Client");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Client",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Birthdate",
                table: "Client",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "IdentificationNumber",
                table: "Client",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Client",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Credit",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    InterestRate = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Credit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Credit_Client_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Client",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordSalt = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserType = table.Column<int>(type: "int", nullable: false),
                    ClientId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Client_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Client",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PaymentPlan",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreditId = table.Column<int>(type: "int", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Interest = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Capital = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentPlan", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentPlan_Credit_CreditId",
                        column: x => x.CreditId,
                        principalTable: "Credit",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Payment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreditId = table.Column<int>(type: "int", nullable: false),
                    PaymentPlanId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payment_PaymentPlan_PaymentPlanId",
                        column: x => x.PaymentPlanId,
                        principalTable: "PaymentPlan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Credit_ClientId",
                table: "Credit",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_PaymentPlanId",
                table: "Payment",
                column: "PaymentPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentPlan_CreditId",
                table: "PaymentPlan",
                column: "CreditId");

            migrationBuilder.CreateIndex(
                name: "IX_User_ClientId",
                table: "User",
                column: "ClientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payment");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "PaymentPlan");

            migrationBuilder.DropTable(
                name: "Credit");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "Birthdate",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "IdentificationNumber",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Client");

            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "Client",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
