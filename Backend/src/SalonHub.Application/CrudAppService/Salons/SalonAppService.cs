using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using SalonHub.Authorization.Users;
using SalonHub.CrudAppService.Clients.Dto;
using SalonHub.CrudAppService.Salons.Dto;
using SalonHub.Domain.Salons;
using System;
using System.Threading.Tasks;

namespace SalonHub.CrudAppService.Salons
{
    public class SalonAppService : AsyncCrudAppService<Salon, SalonDto, Guid>
    {

        private readonly UserManager _userManager;
        public SalonAppService(IRepository<Salon, Guid> repository, UserManager userManager) : base(repository)
        {
            _userManager = userManager;
        }

        public async Task<clientDto> RegisterSalonEmployeeAsync(clientDto input)
        {
            var user = ObjectMapper.Map<User>(input);
            user.IsActive = true;
            user.IsEmailConfirmed = true;
            user.TenantId = null;
            var result = await _userManager.CreateAsync(user, input.Password);
            try
            {
                await _userManager.AddToRoleAsync(user, "Salon");
            }
            catch (Exception)

            {
                throw new UserFriendlyException("Failed creating salon employee");
            }

            return ObjectMapper.Map<clientDto>(input);
        }
    }
}
