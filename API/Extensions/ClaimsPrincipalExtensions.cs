using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static int? GetUserId(this ClaimsPrincipal user)
        {
            if (user == null)
                return null;

            var nameClaim = user.FindFirst(ClaimTypes.Name);
            if (nameClaim == null)
                return null;

            return int.Parse(nameClaim.Value);
        }
    }
}
