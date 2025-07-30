using Abp.Domain.Entities.Auditing;
using System;

namespace SalonHub.Domain.Salons
{
    public class Salon : FullAuditedEntity<Guid>
    {
        public virtual string Name { get; set; }

        //public Address Address { get; set; }

        //public virtual decimal Latitude { get; set; }
        //public virtual decimal Longitude { get; set; }

    }
}
