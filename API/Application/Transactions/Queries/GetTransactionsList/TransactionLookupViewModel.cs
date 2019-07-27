using API.Domain.Enums;
using System;

namespace API.Application.Transactions.Queries.GetTransactionsList
{
    public class TransactionLookupViewModel
    {
        public int TransactionId { get; set; }
        public TransactionType Type { get; set; }
        public decimal Amount { get; set; }
        public decimal ResultingBalance { get; set; }
        public DateTimeOffset Timestamp { get; set; }
    }
}
