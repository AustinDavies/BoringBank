using ConsoleApp.Services.BoringBankAPI;
using System;
using System.Threading.Tasks;

namespace ConsoleApp.Commands
{
    public class ShowBalanceCommand : Command
    {
        private readonly UsersClient _usersClient;

        public ShowBalanceCommand(UsersClient usersClient)
        {
            _usersClient = usersClient;
        }

        public override async Task Run()
        {
            Console.Clear();
            try
            {
                var response = await _usersClient.GetBalanceAsync();
                Console.WriteLine($"Current balance: {response.Balance}");
                ShowPressAnyKeyPrompt();
            }
            catch (Exception ex)
            {
                ShowError(ex);
            }
        }
    }
}
