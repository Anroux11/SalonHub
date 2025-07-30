using Abp.Zero.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SalonHub.Authorization.Roles;
using SalonHub.Authorization.Users;
using SalonHub.Domain.Bookings;
using SalonHub.Domain.EmployeeTechnicians;
using SalonHub.Domain.Salons;
using SalonHub.MultiTenancy;
using System.Net;

namespace SalonHub.EntityFrameworkCore
{
    public class SalonHubDbContext : AbpZeroDbContext<Tenant, Role, User, SalonHubDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Salon> Salons { get; set; }
        public DbSet<EmployeeTechnician> EmployeeTechnicians { get; set; }
        //public DbSet<Technician> Technicians { get; set; }
        //public DbSet<Address> Addresses { get; set; }
        public SalonHubDbContext(DbContextOptions<SalonHubDbContext> options)
            : base(options)
        {
        }
    }
}
