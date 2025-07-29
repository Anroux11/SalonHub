using Abp.Domain.Entities.Auditing;
using SalonHub.Domain.Addresses;
using System;
using System.ComponentModel.DataAnnotations;

namespace SalonHub.Domain.Salons
{
    public class Salon : FullAuditedEntity<Guid>
    {
        public virtual string Name { get; set; }

        public Address Address { get; set; }

        public virtual decimal Latitude { get; set; }
        public virtual decimal Longitude { get; set; }

    }
}
