using Abp.Application.Services;
using Abp.Domain.Repositories;
using SalonHub.CrudAppServiceses.SalonAdmin.Dto;
using SalonHub.Domain.Salons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalonHub.CrudAppServiceses.SalonAdmin
{
    public class SalonAppService : AsyncCrudAppService<Salon, SalonDto, Guid>
    {
        public SalonAppService(IRepository<Salon, Guid> repository) : base(repository)
        {
        }
    }
}
