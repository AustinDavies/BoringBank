using API.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Interfaces
{
    public interface IBoringBankDbContext
    {
        DbSet<User> Users { get; set; }
        DbSet<BankAccount> BankAccounts { get; set; }
        DbSet<Transaction> Transactions { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
