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
using SalonHub.CrudAppService.SalonServices.Dto;
using SalonHub.Domain.SalonServices;
using SalonHub.Domain.Salons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalonHub.CrudAppService.SalonServices
{
    public class SalonServiceAppService : AsyncCrudAppService<SalonService, SalonServiceDto, Guid>
    {
        private readonly IRepository<Salon, Guid> _salonRepository;
        private readonly IRepository<SalonService, Guid> _salonServiceRepository;
        private readonly UserManager _userManager;

        public SalonServiceAppService(IRepository<SalonService, Guid> repository, IRepository<Salon, Guid> salonRepository, UserManager userManager) : base(repository)
        {
            _salonServiceRepository = repository;
            _salonRepository = salonRepository;
            _userManager = userManager;
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

        public override async Task<SalonServiceDto> CreateAsync(SalonServiceDto input)
        {
            var salonId = await GetSalonIdByNameAsync(input.SalonName);
            input.SalonId = salonId;

            

            return await base.CreateAsync(input);
        }

        public override async Task<PagedResultDto<SalonServiceDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            var services = await _salonServiceRepository
                .GetAllIncluding( i => i.Salon).ToListAsync();
            return await base.GetAllAsync(input);
        }
    }
}
