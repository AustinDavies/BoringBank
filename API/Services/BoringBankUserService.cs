using API.Application.Interfaces;
using API.Domain.Entities;
using API.Helpers;
using System;
using System.Linq;

namespace API.Services
{
    public class BoringBankUserService : IBoringBankUserService
    {
        private readonly IBoringBankDbContext _boringBankDbContext;

        public BoringBankUserService(
            IBoringBankDbContext boringBankDbContext)
        {
            _boringBankDbContext = boringBankDbContext;
        }

        public User FindUserByUserId(int userId)
        {
            return _boringBankDbContext.Users
                .SingleOrDefault(x => x.UserId == userId);
        }

        public User FindUserByUsername(string username)
        {
            return _boringBankDbContext.Users
                .SingleOrDefault(x => x.Username.ToLower() == username.ToLower());
        }

        public void SetUserPassword(User user, string password)
        {
            user.Password = PasswordHelpers.HashPassword(password);
        }

        public bool ValidateUsernameAndPassword(string username, string password)
        {
            if (string.IsNullOrEmpty(password))
                return false;

            var user = FindUserByUsername(username);
            if (user == null)
                return false;

            var currentPassword = PasswordHelpers.DerivePasswordFromPasswordHash(user.Password);
            var currentSalt = PasswordHelpers.DeriveSaltFromPasswordHash(user.Password);
            if (currentPassword == null || currentSalt == null)
                return false;

            var providedPasswordHash = PasswordHelpers.HashPassword(password, currentSalt);
            if (user.Password.Length != providedPasswordHash.Length)
                return false;

            return providedPasswordHash.SequenceEqual(user.Password);
        }
    }
}
