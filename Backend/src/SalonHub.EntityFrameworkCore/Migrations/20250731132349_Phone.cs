using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalonHub.Migrations
{
    /// <inheritdoc />
    public partial class Phone : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_AbpUsers_BookingUserId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_BookingUserId",
                table: "Bookings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Bookings_BookingUserId",
                table: "Bookings",
                column: "BookingUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_AbpUsers_BookingUserId",
                table: "Bookings",
                column: "BookingUserId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
