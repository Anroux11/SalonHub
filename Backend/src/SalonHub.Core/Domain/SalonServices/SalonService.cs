using Abp.Domain.Entities.Auditing;
using SalonHub.Domain.Salons;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalonHub.Domain.SalonServices
{
    public class SalonService : FullAuditedEntity<Guid>
    {
        public virtual string Name { get; set; }

        public virtual string Description { get; set; }
        
        public virtual long Price { get; set; }

        public Guid SalonId { get; set; }
        [ForeignKey("SalonId")]
        public virtual Salon Salon { get; set; }
    }
}
