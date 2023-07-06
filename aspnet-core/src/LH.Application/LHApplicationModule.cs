using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using LH.Authorization;

namespace LH
{
    [DependsOn(
        typeof(LHCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class LHApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<LHAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(LHApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
