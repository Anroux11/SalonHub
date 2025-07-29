using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SalonHub.Domain.Addresses;
using SalonHub.Domain.Salons;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SalonHub.CrudAppServiceses.SalonAdmin.Dto
{
    [AutoMap(typeof(Salon))]
    public class SalonDto : EntityDto<Guid>
    {
        public string Name { get; set; }

        public Address Address { get; set; }

        public virtual decimal Latitude { get; set; }
        public virtual decimal Longitude { get; set; }
    }
}
