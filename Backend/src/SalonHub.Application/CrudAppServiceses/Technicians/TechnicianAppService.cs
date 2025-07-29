using Abp.Application.Services;
using Abp.Domain.Repositories;
using SalonHub.CrudAppServiceses.Technicians.Dto;
using SalonHub.Domain.Technicians;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalonHub.CrudAppServiceses.Technicians
{
    public class TechnicianAppService : AsyncCrudAppService<Technician, TechnicianDto, Guid>
    {
        public TechnicianAppService(IRepository<Technician, Guid> repository) : base(repository)
        {
        }
    }
}
