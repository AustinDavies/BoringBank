using API.Application.Interfaces;
using API.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Transactions.Commands.CreateTransaction
{
    public class CreateTransactionCommandHandler : IRequestHandler<CreateTransactionCommand, TransactionCreatedResponse>
    {
        private readonly IBoringBankDbContext _boringBankDbContext;

        public CreateTransactionCommandHandler(
            IBoringBankDbContext boringBankDbContext)
        {
            _boringBankDbContext = boringBankDbContext;
        }
        public async Task<TransactionCreatedResponse> Handle(CreateTransactionCommand request, CancellationToken cancellationToken)
        {
            var user = await _boringBankDbContext.Users
                .Where(x => x.UserId == request.UserId)
                .Include(x => x.BankAccount)
                .ThenInclude(x => x.Transactions)
                .FirstOrDefaultAsync();

            if (user == null)
                throw new Exception($"Unable to find user with userid '{request.UserId}'");

            if (user.BankAccount == null)
                throw new Exception($"Unable to find bank account for userid '{request.UserId}'");

            var hasSufficientFundsForWithdrawl = user.BankAccount.Balance >= request.Amount;

            if (request.IsWithdrawal && !hasSufficientFundsForWithdrawl)
                throw new Exception("Insufficient funds");


            if (request.IsDeposit)
                user.BankAccount.Balance += request.Amount;
            else
                user.BankAccount.Balance -= request.Amount;

            var transaction = new Transaction
            {
                Amount = request.Amount,
                BankAccountId = user.BankAccount.BankAccountId,
                Timestamp = DateTimeOffset.UtcNow,
                TransactionType = request.Type,
                ResultingBalance = user.BankAccount.Balance
            };
            user.BankAccount.Transactions.Add(transaction);

            await _boringBankDbContext.SaveChangesAsync(cancellationToken);

            return new TransactionCreatedResponse
            {
                TransactionId = transaction.TransactionId,
                Amount = transaction.Amount,
                Timestamp = transaction.Timestamp,
                Type = transaction.TransactionType,
                NewBalance = user.BankAccount.Balance
            };
        }
    }
}
