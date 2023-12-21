using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cafihsa.Migrations
{
    /// <inheritdoc />
    public partial class PaymentDetailsAndSettingsArrengment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payment_PaymentPlan_PaymentPlanId",
                table: "Payment");

            migrationBuilder.DropTable(
                name: "PaymentPlan");

            migrationBuilder.DropIndex(
                name: "IX_Payment_PaymentPlanId",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "PaymentPlanId",
                table: "Payment");

            migrationBuilder.CreateTable(
                name: "PaymentDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PaymentId = table.Column<int>(type: "int", nullable: false),
                    ChargeType = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsForgiven = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentDetails_Payment_PaymentId",
                        column: x => x.PaymentId,
                        principalTable: "Payment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UseProcessDate = table.Column<bool>(type: "bit", nullable: false),
                    ProcessDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Payment_CreditId",
                table: "Payment",
                column: "CreditId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentDetails_PaymentId",
                table: "PaymentDetails",
                column: "PaymentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Credit_CreditId",
                table: "Payment",
                column: "CreditId",
                principalTable: "Credit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Credit_CreditId",
                table: "Payment");

            migrationBuilder.DropTable(
                name: "PaymentDetails");

            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.DropIndex(
                name: "IX_Payment_CreditId",
                table: "Payment");

            migrationBuilder.AddColumn<int>(
                name: "PaymentPlanId",
                table: "Payment",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PaymentPlan",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreditId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Capital = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Interest = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false)
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

            migrationBuilder.CreateIndex(
                name: "IX_Payment_PaymentPlanId",
                table: "Payment",
                column: "PaymentPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentPlan_CreditId",
                table: "PaymentPlan",
                column: "CreditId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_PaymentPlan_PaymentPlanId",
                table: "Payment",
                column: "PaymentPlanId",
                principalTable: "PaymentPlan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
