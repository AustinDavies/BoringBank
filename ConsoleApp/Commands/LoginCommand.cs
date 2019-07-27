using ConsoleApp.Services.BoringBankAPI;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp.Commands
{
    public class LoginCommand : Command
    {
        private readonly UsersClient _usersClient;

        public LoginCommand(UsersClient usersClient)
        {
            _usersClient = usersClient;
        }

        public override async Task Run()
        {
            Console.Clear();
            string username, password = null;
            Console.WriteLine("Please enter username: ");
            username = Console.ReadLine();
            Console.WriteLine("Please enter password (must be at least 1 character long): ");
            password = Console.ReadLine();
            Console.WriteLine("Logging in...");

            try
            {
                var response = await _usersClient.AuthenticateAsync(new AuthenticateUserCommand
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
