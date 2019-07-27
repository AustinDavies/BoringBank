using API.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Users.Queries.GetBalance
{
    public class GetBalanceQueryHandler : IRequestHandler<GetBalanceQuery, GetAccountBalanceResponse>
    {

        private readonly IBoringBankDbContext _boringBankDbContext;

        public GetBalanceQueryHandler(IBoringBankDbContext boringBankDbContext)
        {
            _boringBankDbContext = boringBankDbContext;
        }

        public async Task<GetAccountBalanceResponse> Handle(GetBalanceQuery request, CancellationToken cancellationToken)
        {
            var bankAccount = await _boringBankDbContext.BankAccounts
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.UserId == request.UserId);

            if (bankAccount == null)
                throw new Exception($"Not Found: Unable to find bank account for userid '{request.UserId}'");

            return new GetAccountBalanceResponse
            {
                BankAccountId = bankAccount.BankAccountId,
                Balance = bankAccount.Balance
            };

        }
    }
}
