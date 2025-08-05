using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using Potholio.EmailService;
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
        private readonly ISendGridEmailService _sendGridEmailService;

        public ClientAppService(UserManager userManager, ISendGridEmailService sendGrid)
        {
            _userManager = userManager;
            _sendGridEmailService = sendGrid;
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

                await _sendGridEmailService.SendEmailAsync(
                    input.EmailAddress,
                    "Welcome to SalonHub",
                    "<p>You have successfully registered to our platform. Thank you!</p>"
                );

            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("No Client available:", ex.Message);
            }
            await CurrentUnitOfWork.SaveChangesAsync();
        }
    }
}
