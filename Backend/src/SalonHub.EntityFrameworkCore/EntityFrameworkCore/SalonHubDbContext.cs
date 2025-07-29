using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using SalonHub.Authorization.Roles;
using SalonHub.Authorization.Users;
using SalonHub.MultiTenancy;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Linq;
using System;
using SalonHub.Domain.Bookings;
using SalonHub.Domain.Salons;
using SalonHub.Domain.Technicians;
using SalonHub.Domain.Addresses;
using SalonHub.Domain.EmployeeTechnicians;

namespace SalonHub.EntityFrameworkCore
{
    public class SalonHubDbContext : AbpZeroDbContext<Tenant, Role, User, SalonHubDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Salon> Salons { get; set; }
        public DbSet<EmployeeTechnician> EmployeeTechnicians { get; set; }
        public DbSet<Technician> Technicians { get; set; }
        public DbSet<Address> Addresses { get; set; }


        public SalonHubDbContext(DbContextOptions<SalonHubDbContext> options)
            : base(options)
        {
        }
        //Converts datetime
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
                v => v.ToUniversalTime(),
                v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                var properties = entityType.ClrType.GetProperties()
                    .Where(p => p.PropertyType == typeof(DateTime));

                foreach (var property in properties)
                {
                    modelBuilder.Entity(entityType.Name).Property(property.Name)
                        .HasConversion(dateTimeConverter);
                }
            }
        }
    }
}
