using System;
using System.Collections.Generic;
using System.Text;

namespace API.Application.Transactions.Queries.GetTransactionsList
{
    public class GetTransactionListResponse
    {
        public int BankAccountId { get; set; }
        public IEnumerable<TransactionLookupViewModel> Transactions { get; set; }
    }
}
