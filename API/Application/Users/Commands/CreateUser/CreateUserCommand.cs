using MediatR;

namespace API.Application.Users.Commands.CreateUser
{
    public class CreateUserCommand : IRequest<UserCreatedResponse>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
