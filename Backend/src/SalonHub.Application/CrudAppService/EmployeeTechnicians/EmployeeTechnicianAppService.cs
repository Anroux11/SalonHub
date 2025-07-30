using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.ObjectMapping;
using Abp.UI;
using AutoMapper.Internal.Mappers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SalonHub.Authorization.Users;
using SalonHub.CrudAppService.Clients.Dto;
using SalonHub.CrudAppService.EmployeeTechnicians.Dto;
using SalonHub.Domain.EmployeeTechnicians;
using SalonHub.Domain.Salons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalonHub.CrudAppService.EmployeeTechnicians
{
    public class EmployeeTechnicianAppService : AsyncCrudAppService<EmployeeTechnician, EmployeeTechnicianDto, Guid>
    {
        private readonly IRepository<Salon, Guid> _salonRepository;
        private readonly IRepository<EmployeeTechnician, Guid> _employeeTechnicianRepository;
        private readonly UserManager _userManager;
        //private readonly ISendGridEmailService _sendGridEmailService;

        public EmployeeTechnicianAppService(IRepository<EmployeeTechnician, Guid> repository, IRepository<Salon, Guid> salonRepository, UserManager userManager /*ISendGridEmailService sendGridEmailService*/) : base(repository)
        {
            _employeeTechnicianRepository = repository;
            _salonRepository = salonRepository;
            _userManager = userManager;
            //_sendGridEmailService = sendGridEmailService;
        }

        public async Task<Guid> GetSalonIdByNameAsync(string name)
        {
            var salon = await _salonRepository.FirstOrDefaultAsync(
                m => m.Name.ToLower() == name.ToLower()
            );

            if (salon == null)
            {
                Logger.Error($"Salon with name '{name}' not found.");
                throw new Exception("Salon not found");
            }

            return salon.Id;
        }

        public override async Task<EmployeeTechnicianDto> CreateAsync(EmployeeTechnicianDto input)
        {
            var salonId = await GetSalonIdByNameAsync(input.SalonName);
            input.SalonId = salonId;

            var rawPassword = input.Password;

            input.Password = new PasswordHasher<EmployeeTechnicianDto>(new OptionsWrapper<PasswordHasherOptions>(new PasswordHasherOptions())).HashPassword(input, input.Password);

            // try to create user of type EmployeeTechnician
            try
            {
                var register = new clientDto
                {
                    UserName = input.Name,
                    Name = input.Name,
                    Surname = "",
                    EmailAddress = input.Email,
                    Password = rawPassword,
                    roleName = "EmployeeTechnician"
                };
                var user = ObjectMapper.Map<User>(register);
                user.IsActive = true;
                user.IsEmailConfirmed = true;
                user.TenantId = null;
                var result = await _userManager.CreateAsync(user, rawPassword);
                await _userManager.AddToRoleAsync(user, "EmployeeTechnician");
                await CurrentUnitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("register failed: ", ex.ToString());
            }

            //await _sendGridEmailService.SendEmailAsync(
            //       input.Email,
            //       "Welcome to SalonHub",
            //       "<p>You have successfully registered. Thank you!</p>"
            //   );

            await CurrentUnitOfWork.SaveChangesAsync();

            return await base.CreateAsync(input);
        }

        public override async Task<PagedResultDto<EmployeeTechnicianDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            var bookings = await _employeeTechnicianRepository
                .GetAllIncluding( i => i.Salon).ToListAsync();
            return await base.GetAllAsync(input);
        }
    }
}
