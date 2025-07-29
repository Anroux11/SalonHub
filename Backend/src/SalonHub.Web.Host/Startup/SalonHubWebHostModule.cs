using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using SalonHub.Configuration;

namespace SalonHub.Web.Host.Startup
{
    [DependsOn(
       typeof(SalonHubWebCoreModule))]
    public class SalonHubWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public SalonHubWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SalonHubWebHostModule).GetAssembly());
        }
    }
}
