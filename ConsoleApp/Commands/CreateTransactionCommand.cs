using ConsoleApp.Services.BoringBankAPI;
using System;
using System.Threading.Tasks;

namespace ConsoleApp.Commands
{
    public class CreateTransactionCommand : Command
    {
        private readonly TransactionType _transactionType;
        private readonly TransactionsClient _transactionsClient;

        public CreateTransactionCommand(
            TransactionType transactionType,
            TransactionsClient transactionsClient)
        {
            _transactionType = transactionType;
            _transactionsClient = transactionsClient;
        }

        public override async Task Run()
        {
            Console.Clear();
            try
            {
                decimal amount = default;
                var isValidInput = false;
                while (!isValidInput)
                {
                    Console.WriteLine($"Enter amount you would like to {_transactionType.ToString().ToLower()}:");
                    isValidInput = decimal.TryParse(Console.ReadLine(), out amount);
                }
                var response = await _transactionsClient.CreateTransactionAsync(new Services.BoringBankAPI.CreateTransactionCommand
                {
                    Amount = amount,
                    Type = _transactionType
                });
                Console.WriteLine($"Your transaction confirmation number is: {response.TransactionId}");
                Console.WriteLine($"Your new balance is: ${response.NewBalance}");
                ShowPressAnyKeyPrompt();
            }
            catch (Exception ex)
            {
                ShowError(ex);
            }
        }
    }
}
