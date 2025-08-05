using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using SalonHub.Domain.Bookings;
using SalonHub.Domain.Salons;
using SalonHub.Domain.EmployeeTechnicians;
using SalonHub.Domain.SalonServices;
using System;
using System.Threading.Tasks;
using SalonHub.CrudAppService.Bookings.Dto;

namespace SalonHub.CrudAppService.Bookings
{
    [AbpAuthorize] // will restrict to role "Client"
    public class BookingAppService : AsyncCrudAppService<
    Booking, BookingDto, Guid>
    {
        private readonly IRepository<Booking, Guid> _bookingRepository;
        private readonly IRepository<Salon, Guid> _salonRepository;
        private readonly IRepository<EmployeeTechnician, Guid> _employeeTechnicianRepository;
        private readonly IRepository<SalonService, Guid> _salonServiceRepository;

        public BookingAppService(IRepository<Booking, Guid> bookingRepository, IRepository<Salon, Guid> salon, IRepository<EmployeeTechnician, Guid> employeeTechnician,  IRepository<SalonService, Guid> salonService)
            : base(bookingRepository)
        {
            _bookingRepository = bookingRepository;
            _salonRepository = salon;
            _employeeTechnicianRepository = employeeTechnician;
            _salonServiceRepository = salonService;
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

        public async Task<Guid> GetEmployeeTechnicianIdByNameAsync(string name)
        {
            var employeeTech = await _employeeTechnicianRepository.FirstOrDefaultAsync(
                m => m.Name.ToLower() == name.ToLower()
            );

            if (employeeTech == null)
            {
                Logger.Error($"Employee Technician with name '{name}' not found.");
                throw new Exception("Employee Technician not found");
            }

            return employeeTech.Id;
        }
        
        public async Task<Guid> GetSalonServiceIdByNameAsync(string name)
        {
            var salonService = await _salonServiceRepository.FirstOrDefaultAsync(
                m => m.Name.ToLower() == name.ToLower()
            );

            if (salonService == null)
            {
                Logger.Error($"Salon Service with name '{name}' not found.");
                throw new Exception("Salon Service not found");
            }

            return salonService.Id;
        }

        public override async Task<BookingDto> CreateAsync(BookingDto input)
        {
            var salonId = await GetSalonIdByNameAsync(input.SalonName);
            input.SalonId = salonId;

            var employeeTechnicianId = await GetEmployeeTechnicianIdByNameAsync(input.EmployeeTechnicianName);
            input.EmployeeTechnicianId = employeeTechnicianId;
            
            var salonServiceId = await GetSalonServiceIdByNameAsync(input.SalonServiceName);
            input.SalonServiceId = salonServiceId;

            return await base.CreateAsync(input);
        }

        public override async Task<BookingDto> UpdateAsync(BookingDto input)
        {
            var salonId = await GetSalonIdByNameAsync(input.SalonName);
            input.SalonId = salonId;

            var employeeTechnicianId = await GetEmployeeTechnicianIdByNameAsync(input.EmployeeTechnicianName);
            input.EmployeeTechnicianId = employeeTechnicianId;
            
            var salonServiceId = await GetSalonServiceIdByNameAsync(input.service);
            input.SalonServiceId = salonServiceId;

            return await base.UpdateAsync(input);
        }

        public override async Task<PagedResultDto<BookingDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            var bookings = await _bookingRepository
                .GetAllIncluding( i => i.Salon, s => s.employeeTechnician).ToListAsync();
            return await base.GetAllAsync(input);
        }
    }
}
