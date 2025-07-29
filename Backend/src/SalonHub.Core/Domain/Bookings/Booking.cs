using Abp.Domain.Entities.Auditing;
using SalonHub.Authorization.Users;
using SalonHub.Domain.Addresses;
using SalonHub.Domain.Salons;
using SalonHub.Domain.EmployeeTechnicians;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalonHub.Domain.Bookings
{
    public class Booking : FullAuditedEntity<Guid>
    {
        public string? Description { get; set; }
        public string Status { get; set; }
        public string? ImageUrl { get; set; }
        public virtual decimal Latitude { get; set; }
        public virtual decimal Longitude { get; set; }

        public virtual Address bookingAddress { get; set; }

        // Connect reporting uder
        public long ReportingUserId { get; set; }
        [ForeignKey("ReportingUserId")]
        public User ReportingUser { get; set; }

        // Connect the assiged salon
        public Guid SalonId { get; set; }
        [ForeignKey("SalonId")]
        public Salon Salon { get; set; }

        // Connect the service provider
        public Guid? EmployeeTechnicianId { get; set; }
        [ForeignKey("EmployeeTechnicianId")]
        public EmployeeTechnician employeeTechnician { get; set; }
    }
}
