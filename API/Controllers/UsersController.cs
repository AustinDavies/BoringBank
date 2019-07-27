using API.Application.Users.Commands.CreateUser;
using API.Application.Users.Commands.AuthenticateUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using API.Extensions;
using API.Application.Users.Queries.GetBalance;

namespace API.Controllers
{
    [Route("v1/users")]
    [Authorize]
    public class UsersController : BaseController
    {

        [AllowAnonymous]
        [ProducesResponseType(typeof(UserCreatedResponse), StatusCodes.Status201Created)]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody]CreateUserCommand createUserCommand)
        {
            var response = await Mediator.Send(createUserCommand);
            return Created($"/v1/users/{response.UserId}", response);
        }

        [HttpGet]
        [Route("balance")]
        [ProducesResponseType(typeof(GetAccountBalanceResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetBalance()
        {
            var userId = User.GetUserId() ?? default;
            return Ok(await Mediator.Send(
                new GetBalanceQuery { UserId = userId }));
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("authenticate")]
        [ProducesResponseType(typeof(UserAuthenticationResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> Authenticate([FromBody]AuthenticateUserCommand authenticateUserCommand)
        {
            return Ok(await Mediator.Send(authenticateUserCommand));
        }

    }
}
