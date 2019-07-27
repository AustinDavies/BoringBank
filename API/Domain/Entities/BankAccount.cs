using System.Collections.Generic;

namespace API.Domain.Entities
{
    public class BankAccount
    {

        public BankAccount()
        {
            Transactions = new HashSet<Transaction>();
        }

        public int BankAccountId { get; private set; }
        public decimal Balance { get; set; }
        public int UserId { get; set; }
        public User User { get; private set; }
        public ICollection<Transaction> Transactions { get; private set; }
    }
}
