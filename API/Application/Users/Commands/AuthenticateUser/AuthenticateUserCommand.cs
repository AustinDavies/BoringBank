using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace API.Application.Users.Commands.AuthenticateUser
{
    public class AuthenticateUserCommand : IRequest<UserAuthenticationResponse>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
