using Abp.Application.Services;
using SalonHub.MultiTenancy.Dto;

namespace SalonHub.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

