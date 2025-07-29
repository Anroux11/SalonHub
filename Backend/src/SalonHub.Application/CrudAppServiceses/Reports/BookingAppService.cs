using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using SalonHub.CrudAppServiceses.Reports.DTo;
using SalonHub.Domain.Bookings;
using SalonHub.Domain.Salons;
using SalonHub.Domain.EmployeeTechnicians;
using System;
using System.Threading.Tasks;

namespace SalonHub.CrudAppServiceses.Reports
{
    [AbpAuthorize] // will restrict to role "Client"
    public class BookingAppService : AsyncCrudAppService<
    Booking, BookingDto, Guid>
    {
        private readonly IRepository<Booking, Guid> _bookingRepository;
        private readonly IRepository<Salon, Guid> _salonRepository;
        private readonly IRepository<EmployeeTechnician, Guid> _employeeTechnicianRepository;

        public BookingAppService(IRepository<Booking, Guid> bookingRepository, IRepository<Salon, Guid> salon, IRepository<EmployeeTechnician, Guid> employeeTechnician)
            : base(bookingRepository)
        {
            _bookingRepository = bookingRepository;
            _salonRepository = salon;
            _employeeTechnicianRepository = employeeTechnician;
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
            var serviceprovider = await _employeeTechnicianRepository.FirstOrDefaultAsync(
                m => m.Name.ToLower() == name.ToLower()
            );

            if (serviceprovider == null)
            {
                Logger.Error($"Service provider with name '{name}' not found.");
                throw new Exception("Service provider not found");
            }

            return serviceprovider.Id;
        }

        public override async Task<BookingDto> CreateAsync(BookingDto input)
        {
            var salonId = await GetSalonIdByNameAsync(input.SalonName);
            input.SalonId = salonId;

            var serviceproviderId = await GetEmployeeTechnicianIdByNameAsync(input.EmployeeTechnicianName);
            input.EmployeeTechnicianId = serviceproviderId;

            return await base.CreateAsync(input);
        }

        public override async Task<BookingDto> UpdateAsync(BookingDto input)
        {
            var salonId = await GetSalonIdByNameAsync(input.SalonName);
            input.SalonId = salonId;

            var serviceproviderId = await GetEmployeeTechnicianIdByNameAsync(input.EmployeeTechnicianName);
            input.EmployeeTechnicianId = serviceproviderId;

            return await base.UpdateAsync(input);
        }

        public override async Task<PagedResultDto<BookingDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            var bookings = await _bookingRepository
                .GetAllIncluding(i => i.bookingAddress, i => i.Salon, s => s.employeeTechnician).ToListAsync();
            return await base.GetAllAsync(input);
        }
    }
}
