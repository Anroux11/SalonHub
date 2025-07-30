using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using SalonHub.Authorization;

namespace SalonHub
{
    [DependsOn(
        typeof(SalonHubCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class SalonHubApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<SalonHubAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(SalonHubApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
