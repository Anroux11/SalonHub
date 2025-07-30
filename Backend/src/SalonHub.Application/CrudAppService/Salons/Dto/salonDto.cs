using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SalonHub.Domain.Salons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SalonHub.CrudAppService.Salons.Dto
{
    [AutoMap(typeof(Salon))]
    public class SalonDto : EntityDto<Guid>
    {
        public string Name { get; set; }

        //public Address Address { get; set; }
    }
}
