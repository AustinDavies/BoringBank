using ConsoleApp.Commands;
using ConsoleApp.Services.BoringBankAPI;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace ConsoleApp
{
    public class Program
    {
        private const string API_BASE_URL = "http://localhost:5000/";
        private static UsersClient UsersClient { get; set; }
        private static TransactionsClient TransactionsClient { get; set; }
        private static bool IsLoggedIn { get; set; }
        private static string CurrentUsername { get; set; }

        static async Task Main(string[] args)
        {
            var httpClient = new HttpClient();
            UsersClient = new UsersClient(API_BASE_URL, httpClient);
            TransactionsClient = new TransactionsClient(API_BASE_URL, httpClient);
            var isRunning = true;

            while (isRunning)
            {
                if (IsLoggedIn)
                {
                    Console.WriteLine($"Hello, {CurrentUsername}");
                    Console.WriteLine("Available commands: deposit, withdraw, balance, transactions, logout");
                    var input = Console.ReadLine();
                    switch (input.ToLower())
                    {
                        case "balance":
                            {
                                await new ShowBalanceCommand(UsersClient).Run();
                                break;
                            }
                        case "deposit":
                            {
                                await new Commands.CreateTransactionCommand(
                                    TransactionType.Deposit, 
                                    TransactionsClient).Run();
                                break;
                            }
                        case "withdraw":
                            {
                                await new Commands.CreateTransactionCommand(
                                    TransactionType.Withdrawal, 
                                    TransactionsClient).Run();
                                break;
                            }
                        case "transactions":
                            {
                                await new ListTransactionsCommand(TransactionsClient).Run();
                                break;
                            }
                        case "logout":
                            {
                                Logout();
                                break;
                            }
                    }
                }
                else
                {
                    Console.WriteLine("Available commands: login, signup, exit");
                    var input = Console.ReadLine();
                    switch (input.ToLower())
                    {
                        case "login":
                            {
                                await new LoginCommand(UsersClient).Run();
                                break;
                            }
                        case "signup":
                            {
                                await new SignUpCommand(UsersClient).Run();
                                break;
                            }
                        case "exit":
                            isRunning = false;
                            continue;
                    }
                }
                Console.Clear();
            }
        }

        public static void Login(string username, string accessToken)
        {
            CurrentUsername = username;
            UsersClient.SetBearerToken(accessToken);
            TransactionsClient.SetBearerToken(accessToken);
            IsLoggedIn = true;
        }

        public static void Logout()
        {
            CurrentUsername = null;
            UsersClient.SetBearerToken(null);
            TransactionsClient.SetBearerToken(null);
            IsLoggedIn = false;
        }
    }
}
