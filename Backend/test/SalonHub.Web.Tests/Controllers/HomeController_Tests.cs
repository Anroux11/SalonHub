using System.Threading.Tasks;
using SalonHub.Models.TokenAuth;
using SalonHub.Web.Controllers;
using Shouldly;
using Xunit;

namespace SalonHub.Web.Tests.Controllers
{
    public class HomeController_Tests: SalonHubWebTestBase
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