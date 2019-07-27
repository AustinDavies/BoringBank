using API.Domain.Enums;
using System;

namespace API.Domain.Entities
{
    public class Transaction
    {
        public int TransactionId { get; private set; }

        public TransactionType TransactionType { get; set; }
        public decimal Amount { get; set; }
        public decimal ResultingBalance { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public int BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
    }
}
