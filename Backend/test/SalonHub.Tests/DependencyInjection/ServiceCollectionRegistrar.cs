using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Castle.MicroKernel.Registration;
using Castle.Windsor.MsDependencyInjection;
using Abp.Dependency;
using SalonHub.EntityFrameworkCore;
using SalonHub.Identity;

namespace SalonHub.Tests.DependencyInjection
{
    public static class ServiceCollectionRegistrar
    {
        public static void Register(IIocManager iocManager)
        {
            var services = new ServiceCollection();

            IdentityRegistrar.Register(services);

            services.AddEntityFrameworkInMemoryDatabase();

            var employeeTechnician = WindsorRegistrationHelper.CreateEmployeeTechnician(iocManager.IocContainer, services);

            var builder = new DbContextOptionsBuilder<SalonHubDbContext>();
            builder.UseInMemoryDatabase(Guid.NewGuid().ToString()).UseInternalEmployeeTechnician(employeeTechnician);

            iocManager.IocContainer.Register(
                Component
                    .For<DbContextOptions<SalonHubDbContext>>()
                    .Instance(builder.Options)
                    .LifestyleSingleton()
            );
        }
    }
}
