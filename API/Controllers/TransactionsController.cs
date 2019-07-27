using API.Application.Transactions.Commands.CreateTransaction;
using API.Application.Transactions.Queries.GetTransactionsList;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("v1/transactions")]
    [Authorize]
    public class TransactionsController : BaseController
    {
        [HttpGet]
        [ProducesResponseType(typeof(GetTransactionListResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTransactions()
        {
            var userId = User.GetUserId() ?? default;
            return Ok(await Mediator.Send(
                new GetTransactionsListQuery { UserId = userId }));
        }

        [HttpPost]
        [ProducesResponseType(typeof(TransactionCreatedResponse), StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateTransaction([FromBody]CreateTransactionCommand createTransactionCommand)
        {
            var userId = User.GetUserId() ?? default;
            createTransactionCommand.UserId = userId;
            var response = await Mediator.Send(createTransactionCommand);

            return Created($"/v1/transactions/{response.TransactionId}", response);
        }
    }
}
