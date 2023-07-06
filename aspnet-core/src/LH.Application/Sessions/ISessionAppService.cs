using System.Threading.Tasks;
using Abp.Application.Services;
using LH.Sessions.Dto;

namespace LH.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
