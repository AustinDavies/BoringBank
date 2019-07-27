using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Security.Cryptography;

namespace API.Helpers
{
    public static class PasswordHelpers
    {
        private const int KEY_ITERATIONS = 120000;
        private const int SALT_SIZE = 16;
        private const int PASSWORD_SIZE = 16;
        private const int KEY_DERIVATION_SIZE = SALT_SIZE + PASSWORD_SIZE;

        public static byte[] HashPassword(string password)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[SALT_SIZE]);

            return HashPassword(password, salt);
        }

        public static byte[] HashPassword(string password, byte[] salt)
        {
            var passwordHash = KeyDerivation.Pbkdf2(
            password: password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: KEY_ITERATIONS,
            numBytesRequested: KEY_DERIVATION_SIZE);

            return PrependSaltToPasswordHash(passwordHash, salt);
        }

        public static byte[] DerivePasswordFromPasswordHash(byte[] passwordHash)
        {
            var derivedPassword = new byte[PASSWORD_SIZE];
            Array.Copy(passwordHash, SALT_SIZE, derivedPassword, 0, PASSWORD_SIZE);

            return derivedPassword;
        }

        public static byte[] DeriveSaltFromPasswordHash(byte[] passwordHash)
        {
            var salt = new byte[SALT_SIZE];
            Array.Copy(passwordHash, 0, salt, 0, SALT_SIZE);
            return salt;
        }

        private static byte[] PrependSaltToPasswordHash(byte[] passwordHash, byte[] salt)
        {
            var prependedHash = new byte[KEY_DERIVATION_SIZE];
            Array.Copy(salt, 0, prependedHash, 0, SALT_SIZE);
            Array.Copy(passwordHash, 0, prependedHash, SALT_SIZE, PASSWORD_SIZE);

            return prependedHash;
        }
    }
}
