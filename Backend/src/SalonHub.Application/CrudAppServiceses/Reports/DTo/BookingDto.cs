using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SalonHub.Domain.Addresses;
using SalonHub.Domain.Bookings;
using System;

namespace SalonHub.CrudAppServiceses.Reports.DTo
{
    [AutoMap(typeof(Booking))]
    public class BookingDto : EntityDto<Guid>
    {
        public string? description { get; set; }
        public string status { get; set; }
        public string? imageUrl { get; set; }
        public virtual decimal Latitude { get; set; }
        public virtual decimal Longitude { get; set; }
        public Address bookingAddress { get; set; }
        public string SalonName { get; set; }
        public Guid? SalonId { get; set; }
        public long ReportingUserId { get; set; }
        public Guid? EmployeeTechnicianId { get; set; }
        public string? EmployeeTechnicianName { get; set; }
    }
}
