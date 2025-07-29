using System.Threading.Tasks;
using SalonHub.Configuration.Dto;

namespace SalonHub.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
