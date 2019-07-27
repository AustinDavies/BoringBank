using System;
using System.Threading.Tasks;

namespace ConsoleApp.Commands
{
    public abstract class Command
    {
        public abstract Task Run();
        protected void ShowPressAnyKeyPrompt()
        {
            Console.WriteLine("Press any key to return to menu...");
            Console.ReadKey();
        }

        protected void ShowError(Exception ex)
        {
            Console.WriteLine(ex.Message);
            ShowPressAnyKeyPrompt();
            Console.Clear();
        }
    }
}
