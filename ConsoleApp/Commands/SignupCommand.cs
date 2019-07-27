using ConsoleApp.Services.BoringBankAPI;
using System;
using System.Threading.Tasks;

namespace ConsoleApp.Commands
{
    public class SignUpCommand : Command
    {

        private readonly UsersClient _usersClient;

        public SignUpCommand(UsersClient usersClient)
        {
            _usersClient = usersClient;
        }

        public override async Task Run()
        {
            string username = null, password = null;
            while (string.IsNullOrWhiteSpace(username))
            {
                Console.Clear();
                Console.WriteLine("Please enter username: ");
                username = Console.ReadLine();
            }
            while (string.IsNullOrWhiteSpace(password))
            {
                Console.WriteLine("Please enter password (must be at least 1 character long): ");
                password = Console.ReadLine();
            }
            Console.WriteLine("Creating account...");
            try
            {
                var response = await _usersClient.CreateUserAsync(new CreateUserCommand
                {
                    Username = username,
                    Password = password
                });
                Program.Login(username, response.AccessToken);
            }
            catch (Exception ex)
            {
                ShowError(ex);
            }
        }
    }
}
