using Abp.Application.Services;
using LH.MultiTenancy.Dto;

namespace LH.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

