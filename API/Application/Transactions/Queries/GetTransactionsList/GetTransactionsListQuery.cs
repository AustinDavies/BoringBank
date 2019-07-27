using MediatR;
using Newtonsoft.Json;

namespace API.Application.Transactions.Queries.GetTransactionsList
{
    public class GetTransactionsListQuery : IRequest<GetTransactionListResponse>
    {
        [JsonIgnore]
        public int UserId { get; set; }
    }
}
