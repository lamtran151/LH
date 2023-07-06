using Abp.Authorization;
using LH.Authorization.Roles;
using LH.Authorization.Users;

namespace LH.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
