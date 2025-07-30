using Abp.Domain.Entities.Auditing;
using SalonHub.Authorization.Users;
using SalonHub.Domain.EmployeeTechnicians;
using SalonHub.Domain.Salons;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalonHub.Domain.Bookings
{
    public class Booking : FullAuditedEntity<Guid>
    {
        public string Date { get; set; }
        public string Service { get; set; }
        public string Status { get; set; }
        public string? ImageUrl { get; set; }

        //public virtual Address bookingAddress { get; set; }

        // Connect reporting uder
        public long BookingUserId { get; set; }
        [ForeignKey("BookingUserId")]

        // Connect the assiged salon
        public Guid SalonId { get; set; }
        [ForeignKey("SalonId")]
        public Salon Salon { get; set; }

        public string SalonName { get; set; }

        // Connect the service provider
        public Guid? EmployeeTechnicianId { get; set; }
        [ForeignKey("EmployeeTechnicianId")]
        public EmployeeTechnician employeeTechnician { get; set; }
    }
}
