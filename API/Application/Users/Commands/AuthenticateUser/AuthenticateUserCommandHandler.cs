using API.Application.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Users.Commands.AuthenticateUser
{
    public class AuthenticateUserCommandHandler : IRequestHandler<AuthenticateUserCommand, UserAuthenticationResponse>
    {
        private readonly IBoringBankUserService _boringBankUserService;
        private readonly IBoringBankTokenService _boringBankTokenService;

        public AuthenticateUserCommandHandler(
            IBoringBankUserService boringBankUserService,
            IBoringBankTokenService boringBankTokenService)
        {
            _boringBankUserService = boringBankUserService;
            _boringBankTokenService = boringBankTokenService;
        }

        public Task<UserAuthenticationResponse> Handle(AuthenticateUserCommand request, CancellationToken cancellationToken)
        {
            var hasValidCredentials = _boringBankUserService.ValidateUsernameAndPassword(request.Username, request.Password);

            if (!hasValidCredentials)
                throw new Exception("Invalid username or password");

            var user = _boringBankUserService.FindUserByUsername(request.Username);
            var token = _boringBankTokenService.CreateTokenFromUser(user);

            return Task.FromResult(new UserAuthenticationResponse
            {
                AccessToken = token
            });
            
        }
    }
}
