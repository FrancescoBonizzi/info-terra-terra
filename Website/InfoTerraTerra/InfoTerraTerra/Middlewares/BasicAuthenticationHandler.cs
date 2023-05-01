using System.Net;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using InfoTerraTerra_Library.Users;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace InfoTerraTerra.Middlewares;

public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly IUsersRepository _userRepository;
    public const string DefaultScheme = "BasicAuthentication";

    public BasicAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock, IUsersRepository userRepository) :
        base(options, logger, encoder, clock)
    {
        _userRepository = userRepository;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        try
        {
            var authHeader = Request.Headers["Authorization"].ToString();
            if (!string.IsNullOrWhiteSpace(authHeader) && authHeader.StartsWith("Basic "))
            {
                var header = AuthenticationHeaderValue.Parse(authHeader);
                if (header.Parameter != null)
                {
                    var inBytes = Convert.FromBase64String(header.Parameter);
                    var credentials = Encoding.UTF8.GetString(inBytes).Split(':');
                    var username = credentials[0];
                    var password = credentials[1];
                    var authenticatedUser = await _userRepository.Login(username, password);

                    var claims = new[]
                    {
                        new Claim("username", username),
                        new Claim(ClaimTypes.Role, "Admin"),
                        new Claim("name", authenticatedUser.Name)
                    };

                    var identity = new ClaimsIdentity(claims, "Basic");
                    var claimsPrincipal = new ClaimsPrincipal(identity);

                    return await Task.FromResult(
                        AuthenticateResult.Success(
                            new AuthenticationTicket(
                                claimsPrincipal,
                                Scheme.Name)));
                }
            }
        }
        catch (UnhautorizedException)
        {
            return await Task.FromResult(DontAutenticate());
        }
        
        return await Task.FromResult(DontAutenticate());
    }
    
    private AuthenticateResult DontAutenticate()
    {
        Response.StatusCode = (int)HttpStatusCode.Unauthorized;
        Response.Headers.Add("WWW-Authenticate", "Basic");
        return AuthenticateResult.Fail("Invalid Authorization Header");
    }

}