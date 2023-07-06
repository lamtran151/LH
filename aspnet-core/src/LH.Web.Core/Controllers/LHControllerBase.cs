using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace LH.Controllers
{
    public abstract class LHControllerBase: AbpController
    {
        protected LHControllerBase()
        {
            LocalizationSourceName = LHConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
