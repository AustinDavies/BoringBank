using System;
using System.Collections.Generic;
using System.Text;

namespace API.Application.Users.Queries.GetBalance
{
    public class GetAccountBalanceResponse
    {
        public int BankAccountId { get; set; }
        public decimal Balance { get; set; }
    }
}
