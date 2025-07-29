using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SalonHub.Domain.Addresses;
using SalonHub.Domain.EmployeeTechnicians;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalonHub.CrudAppServiceses.EmployeeTechnicians.Dto
{
    [AutoMap(typeof(EmployeeTechnician))]
    public class EmployeeTechnicianDto : EntityDto<Guid>
    {
        public string Name { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [PasswordPropertyText]
        public string Password { get; set; }

        public Address Address { get; set; }

        public virtual decimal Latitude { get; set; }
        public virtual decimal Longitude { get; set; }

        public Guid SalonId { get; set; }
        public string SalonName { get; set; }
    }
}
