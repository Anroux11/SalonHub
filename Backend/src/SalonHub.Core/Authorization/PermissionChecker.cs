using Abp.Authorization;
using SalonHub.Authorization.Roles;
using SalonHub.Authorization.Users;

namespace SalonHub.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
