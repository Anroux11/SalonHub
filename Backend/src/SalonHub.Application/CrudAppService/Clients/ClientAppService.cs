using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using SalonHub.Authorization.Users;
using SalonHub.CrudAppService.Clients.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalonHub.CrudAppService.Clients
{
    public class ClientAppService : ApplicationService
    {
        private readonly UserManager _userManager;
        private readonly IRepository<User, long> _userRepository;

        public ClientAppService(UserManager userManager)
        {
            _userManager = userManager;
        }

        public async Task RegisterAsync(clientDto input)
        {
            var user = ObjectMapper.Map<User>(input);
            user.IsActive = true;
            user.IsEmailConfirmed = true;
            user.TenantId = null;
            var result = await _userManager.CreateAsync(user, input.Password);
            try
            {
                if (input.roleName == "Client")
                {
                    await _userManager.AddToRoleAsync(user, "Client");

                }
                else if (input.roleName == "Salon")
                {
                    await _userManager.AddToRoleAsync(user, "Salon");
                }
                else if (input.roleName == "EmployeeTechnician")
                {
                    await _userManager.AddToRoleAsync(user, "EmployeeTechnician");
                }

                //await _sendGridEmailService.SendEmailAsync(
                //    input.EmailAddress,
                //    "Welcome to SalonHub",
                //    "<p>You have successfully registered. Thank you!</p>"
                //);

            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("No Client available:", ex.Message);
            }
            await CurrentUnitOfWork.SaveChangesAsync();
        }
    }
}
