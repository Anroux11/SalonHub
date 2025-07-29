using Abp.AutoMapper;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using SalonHub.Domain.Addresses;
using SalonHub.Domain.Salons;
using SalonHub.Domain.Technicians;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalonHub.Domain.EmployeeTechnicians
{
    public class EmployeeTechnician : FullAuditedEntity<Guid>
    {
        public virtual string Name { get; set; }

        [EmailAddress]
        public virtual string Email { get; set; }

        [PasswordPropertyText]
        public virtual string Password { get; set; }

        public virtual Address Address { get; set; }

        public virtual decimal Latitude { get; set; }
        public virtual decimal Longitude { get; set; }

        public Guid SalonId { get; set; }
        [ForeignKey("SalonId")]
        public virtual Salon Salon { get; set; }

    }
}
