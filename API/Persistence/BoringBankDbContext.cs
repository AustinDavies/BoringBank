using API.Application.Interfaces;
using API.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Persistence
{
    public class BoringBankDbContext : DbContext, IBoringBankDbContext
    {
        public BoringBankDbContext() { }

        public BoringBankDbContext(DbContextOptions<BoringBankDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<BankAccount> BankAccounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(BoringBankDbContext).Assembly);
        }
    }
}
