using System;

namespace API.Domain.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public byte[] Password { get; set; }
        public BankAccount BankAccount { get; set; }
    }
}
