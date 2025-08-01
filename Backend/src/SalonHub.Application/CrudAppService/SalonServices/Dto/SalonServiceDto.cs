
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SalonHub.Domain.SalonServices;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SalonHub.CrudAppService.SalonServices.Dto
{
    [AutoMap(typeof(SalonService))]
    public class SalonServiceDto : EntityDto<Guid>
    {
        public string Name { get; set; }

        public string Description { get; set; }
        
        public long Price { get; set; }

        public Guid SalonId { get; set; }
        public string SalonName { get; set; }
    }
}
