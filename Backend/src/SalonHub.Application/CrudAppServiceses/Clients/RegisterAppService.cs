using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using SalonHub.Authorization.Users;
using SalonHub.CrudAppServiceses.Clients.DTo;
using SalonHub.EmailService;
using SendGrid;
using System;
using System.Threading.Tasks;

namespace SalonHub.CrudAppServiceses.Clients
{
    [AbpAllowAnonymous]
    public class RegisterAppService : ApplicationService
    {
        private readonly UserManager _userManager;
        private readonly IRepository<User, long> _userRepository;
        private readonly ISendGridEmailService _sendGridEmailService;

        public RegisterAppService(UserManager userManager, ISendGridEmailService sendGrid)
        {
            _userManager = userManager;
            _sendGridEmailService = sendGrid;
        }

        public async Task RegisterAsync(RegisterDTo input)
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
                    "<p>You have successfully registered. Thank you!</p>"
                );

            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("No Client available:", ex.Message);
            }
            await CurrentUnitOfWork.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            await _userRepository.UpdateAsync(user);
            await CurrentUnitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(User user)
        {
            await _userRepository.DeleteAsync(user);
            await CurrentUnitOfWork.SaveChangesAsync();
        }
    }
}
