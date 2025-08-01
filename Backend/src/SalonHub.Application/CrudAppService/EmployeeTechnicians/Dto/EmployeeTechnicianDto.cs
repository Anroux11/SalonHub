using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SalonHub.Domain.EmployeeTechnicians;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SalonHub.CrudAppService.EmployeeTechnicians.Dto
{
    [AutoMap(typeof(EmployeeTechnician))]
    public class EmployeeTechnicianDto : EntityDto<Guid>
    {
        public string Name { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [PasswordPropertyText]
        public string Password { get; set; }

        public string JobTitle { get; set; }
 
       public int ContactNumber { get; set; }

        //public Address Address { get; set; }
        public Guid SalonId { get; set; }
        public string SalonName { get; set; }
    }
}
