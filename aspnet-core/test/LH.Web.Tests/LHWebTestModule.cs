using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using LH.EntityFrameworkCore;
using LH.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace LH.Web.Tests
{
    [DependsOn(
        typeof(LHWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class LHWebTestModule : AbpModule
    {
        public LHWebTestModule(LHEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(LHWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(LHWebMvcModule).Assembly);
        }
    }
}