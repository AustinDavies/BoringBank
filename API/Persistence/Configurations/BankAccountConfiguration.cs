using API.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Persistence.Configurations
{
    public class BankAccountConfiguration : IEntityTypeConfiguration<BankAccount>
    {
        public void Configure(EntityTypeBuilder<BankAccount> builder)
        {
            builder.HasKey(x => x.BankAccountId);

            builder.HasMany(x => x.Transactions)
                .WithOne(x => x.BankAccount)
                .HasForeignKey(x => x.BankAccountId);

        }
    }
}
