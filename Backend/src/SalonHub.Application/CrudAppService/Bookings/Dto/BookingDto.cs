using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SalonHub.Domain.Bookings;

namespace SalonHub.CrudAppService.Bookings.Dto
{
    [AutoMap(typeof(Booking))]
    public class BookingDto : EntityDto<Guid>
    {   
        public string date { get; set; }
        public string service { get; set; }
        public string status { get; set; }
        public string? imageUrl { get; set; }
        public string SalonName { get; set; }
        public Guid? SalonId { get; set; }
        public long BookingUserId { get; set; }
        public Guid? EmployeeTechnicianId { get; set; }
        public string? EmployeeTechnicianName { get; set; }
        public Guid? SalonServiceId { get; set; }
        public string? SalonServiceName { get; set; }
    }
}
;