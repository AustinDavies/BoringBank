using MediatR;
using Newtonsoft.Json;

namespace API.Application.Users.Queries.GetBalance
{
    public class GetBalanceQuery : IRequest<GetAccountBalanceResponse>
    {
        [JsonIgnore]
        public int UserId { get; set; }
    }
}
