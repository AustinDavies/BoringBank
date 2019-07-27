using API.Application.Interfaces;
using API.Configuration;
using API.Domain.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class BoringBankTokenService : IBoringBankTokenService
    {
        private readonly AppSettings _settings;

        public BoringBankTokenService(
            IOptions<AppSettings> settings)
        {
            _settings = settings.Value;
        }

        public string CreateTokenFromUser(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var signingKey = Encoding.ASCII.GetBytes(_settings.TokenSigningKey);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(signingKey), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
