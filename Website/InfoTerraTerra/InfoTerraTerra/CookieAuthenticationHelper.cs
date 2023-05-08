using System.Security.Claims;
using InfoTerraTerra_Library.Users;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace InfoTerraTerra;

public static class CookieAuthenticationHelper
{
    public static ClaimsPrincipal GeneratePrincipal(User user)
    {
        var identity = new ClaimsIdentity(
            CookieAuthenticationDefaults.AuthenticationScheme,
            ClaimTypes.Name,
            ClaimTypes.Role);

        identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Username));
        identity.AddClaim(new Claim(ClaimTypes.Name, user.Name));

        return new ClaimsPrincipal(identity);
    }
}