using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using SalonHub.Configuration.Dto;

namespace SalonHub.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : SalonHubAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
