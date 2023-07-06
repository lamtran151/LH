using System.Threading.Tasks;
using LH.Models.TokenAuth;
using LH.Web.Controllers;
using Shouldly;
using Xunit;

namespace LH.Web.Tests.Controllers
{
    public class HomeController_Tests: LHWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}