namespace API.Application.Users.Commands.CreateUser
{
    public class UserCreatedResponse
    {
        public int UserId { get; set; }
        public int BankAccountId { get; set; }
        public string AccessToken { get; set; }
    }
}
