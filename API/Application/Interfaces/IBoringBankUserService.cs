using API.Domain.Entities;

namespace API.Application.Interfaces
{
    public interface IBoringBankUserService
    {
        User FindUserByUsername(string username);
        User FindUserByUserId(int userId);
        void SetUserPassword(User user, string password);
        bool ValidateUsernameAndPassword(string username, string password);
    }
}
