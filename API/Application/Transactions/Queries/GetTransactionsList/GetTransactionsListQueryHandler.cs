using API.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Transactions.Queries.GetTransactionsList
{
    public class GetTransactionsListQueryHandler : IRequestHandler<GetTransactionsListQuery, GetTransactionListResponse>
    {
        private readonly IBoringBankDbContext _boringBankDbContext;

        public GetTransactionsListQueryHandler(IBoringBankDbContext boringBankDbContext)
        {
            _boringBankDbContext = boringBankDbContext;
        }

        public async Task<GetTransactionListResponse> Handle(GetTransactionsListQuery request, CancellationToken cancellationToken)
        {
            var bankAccount = await _boringBankDbContext.BankAccounts
                .Include(x => x.Transactions)
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.UserId == request.UserId);

            if (bankAccount == null)
                throw new Exception($"Not found: Unable to find a bank account associated with userId '{request.UserId}'");

            var transactions = bankAccount.Transactions
                .Select(transaction => new TransactionLookupViewModel
                {
                    TransactionId = transaction.TransactionId,
                    Timestamp = transaction.Timestamp,
                    Type = transaction.TransactionType,
                    Amount = transaction.Amount,
                    ResultingBalance = transaction.ResultingBalance
                })
                .ToList();

            return new GetTransactionListResponse
            {
                BankAccountId = bankAccount.BankAccountId,
                Transactions = transactions
            };

        }
    }
}
