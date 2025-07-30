using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalonHub.Migrations
{
    /// <inheritdoc />
    public partial class updatedbooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SalonName",
                table: "Bookings",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SalonName",
                table: "Bookings");
        }
    }
}
