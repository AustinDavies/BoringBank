using API.Domain.Enums;
using System;

namespace API.Application.Transactions.Commands.CreateTransaction
{
    public class TransactionCreatedResponse
    {
        public int TransactionId { get; set; }
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public decimal NewBalance { get; set; }
    }
}
