using System.Security.Claims;

namespace InfoTerraTerra.AspNetCore;

public static class IdentityExtensions
{
    public static string? GetLoggedUserName(this ClaimsPrincipal claimsPrincipal)
    {
        if (claimsPrincipal.Identity?.IsAuthenticated == false)
            return null;

        var userNameClaim = claimsPrincipal.FindFirst(ClaimTypes.Name);

        return userNameClaim?.Value;
    }
    
}