using System.Threading.Tasks;
using Abp.Application.Services;
using SalonHub.Authorization.Accounts.Dto;

namespace SalonHub.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
