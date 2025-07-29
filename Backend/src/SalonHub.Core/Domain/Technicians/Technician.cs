using Abp.Domain.Entities.Auditing;
using SalonHub.Domain.EmployeeTechnicians;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalonHub.Domain.Technicians
{
    public class Technician : FullAuditedEntity<Guid>
    {
        public virtual string Name { get; set; }

        [EmailAddress]
        public virtual string Email { get; set; }

        [PasswordPropertyText]
        public virtual string Password { get; set; }

        [Phone]
        public virtual int ContactNumber { get; set; }

        // connect service provider
        public Guid EmployeeTechnicianId { get; set; }
        [ForeignKey("EmployeeTechnicianId")]
        public virtual EmployeeTechnician EmployeeTechnician { get; set; }
    }
}
