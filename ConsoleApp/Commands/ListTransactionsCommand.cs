using ConsoleApp.Services.BoringBankAPI;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ConsoleApp.Commands
{
    public class ListTransactionsCommand : Command
    {
        private readonly TransactionsClient _transactionsClient;

        public ListTransactionsCommand(TransactionsClient transactionsClient)
        {
            _transactionsClient = transactionsClient;
        }

        public override async Task Run()
        {
            Console.Clear();
            try
            {
                var response = await _transactionsClient.GetTransactionsAsync();

                if (response.Transactions.Count == 0)
                {
                    Console.WriteLine("No transactions recorded.");
                }
                else
                {
                    // "Time ID Type Amount Balance"
                    Console.WriteLine(String.Format(
                        "{0,-22}{1,-5}{2,-11}{3,-16}{4,-15}",
                        "Time", "ID", "Type", "Amount", "Balance"));
                    foreach (var transaction in response.Transactions.OrderByDescending(x => x.Timestamp))
                        Console.WriteLine(
                            string.Format(
                                "{0,-22}{1,-5}{2,-11}${3,-15}${4,-15}",
                                transaction.Timestamp.ToString("G"),
                                transaction.TransactionId,
                                transaction.Type.ToString(),
                                transaction.Amount,
                                transaction.ResultingBalance));
                }
                ShowPressAnyKeyPrompt();
            }
            catch (Exception ex)
            {
                ShowError(ex);
            }
        }
    }
}
