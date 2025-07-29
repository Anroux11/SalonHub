using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace SalonHub.EntityFrameworkCore
{
    public static class SalonHubDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<SalonHubDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<SalonHubDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
