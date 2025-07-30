using Abp.Authorization;
using Abp.Authorization.Roles;
using Abp.Authorization.Users;
using Abp.MultiTenancy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SalonHub.Authorization;
using SalonHub.Authorization.Roles;
using SalonHub.Authorization.Users;
using SalonHub.Domain.Salons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace SalonHub.EntityFrameworkCore.Seed.Host
{
    public class HostRoleAndUserCreator
    {
        private readonly SalonHubDbContext _context;

        public HostRoleAndUserCreator(SalonHubDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateHostRoleAndUsers();
        }

        private void CreateHostRoleAndUsers()
        {
            // Admin role for host

            var adminRoleForHost = _context.Roles.IgnoreQueryFilters().FirstOrDefault(r => r.TenantId == null && r.Name == StaticRoleNames.Host.Admin);
            if (adminRoleForHost == null)
            {
                adminRoleForHost = _context.Roles.Add(new Role(null, StaticRoleNames.Host.Admin, StaticRoleNames.Host.Admin) { IsStatic = true, IsDefault = true }).Entity;
                _context.SaveChanges();
            }

            // Client role

            var clientRole = _context.Roles.IgnoreQueryFilters().FirstOrDefault(r => r.TenantId == null && r.Name == "Client");
            if (clientRole == null)
            {
                clientRole = _context.Roles.Add(new Role(null, "Client", "Client") { IsStatic = true }).Entity;
                _context.SaveChanges();
            }

            // Salon role

            var SalonRole = _context.Roles.IgnoreQueryFilters().FirstOrDefault(r => r.TenantId == null && r.Name == "Salon");
            if (SalonRole == null)
            {
                SalonRole = _context.Roles.Add(new Role(null, "Salon", "Salon") { IsStatic = true }).Entity;
                _context.SaveChanges();
            }

            // EmployeeTechnician role

            var EmployeeTechnicianRole = _context.Roles.IgnoreQueryFilters().FirstOrDefault(r => r.TenantId == null && r.Name == "EmployeeTechnician");
            if (EmployeeTechnicianRole == null)
            {
                EmployeeTechnicianRole = _context.Roles.Add(new Role(null, "EmployeeTechnician", "EmployeeTechnician") { IsStatic = true }).Entity;
                _context.SaveChanges();
            }

            // Grant all permissions to admin role for host

            var grantedPermissions = _context.Permissions.IgnoreQueryFilters()
                .OfType<RolePermissionSetting>()
                .Where(p => p.TenantId == null && p.RoleId == adminRoleForHost.Id)
                .Select(p => p.Name)
                .ToList();

            var permissions = PermissionFinder
                .GetAllPermissions(new SalonHubAuthorizationProvider())
                .Where(p => p.MultiTenancySides.HasFlag(MultiTenancySides.Host) &&
                            !grantedPermissions.Contains(p.Name))
                .ToList();

            if (permissions.Any())
            {
                _context.Permissions.AddRange(
                    permissions.Select(permission => new RolePermissionSetting
                    {
                        TenantId = null,
                        Name = permission.Name,
                        IsGranted = true,
                        RoleId = adminRoleForHost.Id
                    })
                );
                _context.SaveChanges();
            }

            // Admin user for host

            var adminUserForHost = _context.Users.IgnoreQueryFilters().FirstOrDefault(u => u.TenantId == null && u.UserName == AbpUserBase.AdminUserName);
            if (adminUserForHost == null)
            {
                var user = new User
                {
                    TenantId = null,
                    UserName = AbpUserBase.AdminUserName,
                    Name = "admin",
                    Surname = "admin",
                    EmailAddress = "admin@aspnetboilerplate.com",
                    IsEmailConfirmed = true,
                    IsActive = true
                };

                user.Password = new PasswordHasher<User>(new OptionsWrapper<PasswordHasherOptions>(new PasswordHasherOptions())).HashPassword(user, "123qwe");
                user.SetNormalizedNames();

                adminUserForHost = _context.Users.Add(user).Entity;
                _context.SaveChanges();

                // Assign Admin role to admin user
                _context.UserRoles.Add(new UserRole(null, adminUserForHost.Id, adminRoleForHost.Id));
                _context.SaveChanges();

                // Seeding salons
                var gautengSalons = new List<Salon>
                {
                    new Salon { Name = "City of Johannesburg Metropolitan Salon"},
                    new Salon { Name = "City of Tshwane Metropolitan Salon"},
                    new Salon { Name = "City of Ekurhuleni Metropolitan Salon"},
                    new Salon { Name = "Sedibeng District Salon"},
                    new Salon { Name = "West Rand District Salon" }

                };

                foreach (var salon in gautengSalons)
                {
                    if (!_context.Salons.Any(m => m.Name == salon.Name))
                    {
                        Console.WriteLine($"Seeding salon: {salon.Name}");
                        _context.Salons.Add(salon);
                    }
                }
                _context.SaveChanges();
            }
        }
    }
}
