using API.Domain.Enums;
using MediatR;
using Newtonsoft.Json;
using System;

namespace API.Application.Transactions.Commands.CreateTransaction
{
    public class CreateTransactionCommand : IRequest<TransactionCreatedResponse>
    {
        [JsonIgnore]
        private decimal _amount { get; set; }
        [JsonIgnore]
        public int UserId { get; set; }
        public TransactionType Type { get; set; }
        public decimal Amount {
            get {
                return _amount;
            }
            set {
                _amount = Math.Abs(value);
            }
        }
        [JsonIgnore]
        public bool IsWithdrawal => Type == TransactionType.Withdrawal;
        [JsonIgnore]
        public bool IsDeposit => Type == TransactionType.Deposit;
    }
}
