using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalonHub.CrudAppServiceses.Addresses.Dto
{
    public class AddressDto : EntityDto<Guid>
    {
        public string city { get; set; }
        public string province { get; set; }
    }
}
