using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace SalonHub.Controllers
{
    public abstract class SalonHubControllerBase: AbpController
    {
        protected SalonHubControllerBase()
        {
            LocalizationSourceName = SalonHubConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
