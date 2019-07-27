using API.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Interfaces
{
    public interface IBoringBankTokenService
    {
        string CreateTokenFromUser(User user);
    }
}
