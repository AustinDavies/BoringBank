using API.Application.Interfaces;
using API.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace API.Application.Users.Commands.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, UserCreatedResponse>
    {
        private readonly IBoringBankDbContext _boringBankDbContext;
        private readonly IBoringBankUserService _boringBankUserService;
        private readonly IBoringBankTokenService _boringBankTokenService;

        public CreateUserCommandHandler(
            IBoringBankDbContext boringBankDbContext,
            IBoringBankUserService boringBankUserService,
            IBoringBankTokenService boringBankTokenService)
        {
            _boringBankDbContext = boringBankDbContext;
            _boringBankUserService = boringBankUserService;
            _boringBankTokenService = boringBankTokenService;
        }

        public async Task<UserCreatedResponse> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var isUsernameTaken = (await _boringBankDbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Username.ToLower() == request.Username.ToLower())) != null;

            if (isUsernameTaken)
                throw new Exception($"User already exists with username {request.Username}");

            var user = new User
            {
                Username = request.Username,
                BankAccount = new BankAccount()
            };

            _boringBankUserService.SetUserPassword(user, request.Password);

            _boringBankDbContext.Users.Add(user);

            await _boringBankDbContext.SaveChangesAsync(cancellationToken);

            var token = _boringBankTokenService.CreateTokenFromUser(user);

            return new UserCreatedResponse
            {
                AccessToken = token,
                UserId = user.UserId,
                BankAccountId = user.BankAccount.BankAccountId
            };

        }
    }
}
