using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SalonHub.Domain.Technicians;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalonHub.CrudAppServiceses.Technicians.Dto
{
    [AutoMap(typeof(Technician))]
    public class TechnicianDto : EntityDto<Guid>
    {
        public string Name { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string ContactNumber { get; set; }

        [PasswordPropertyText]
        public string Password { get; set; }
    }
}
