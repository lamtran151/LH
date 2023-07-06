using System.Threading.Tasks;
using LH.Configuration.Dto;

namespace LH.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
