using InfoTerraTerra_Library;
using InfoTerraTerra_Library.Users;
using InfoTerraTerra.Models.Auth;
using InfoTerraTerra.Requests;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InfoTerraTerra.Controllers;

[Route("auth")]
public class AuthController : Controller
{
    private readonly IUsersRepository _usersRepository;

    public AuthController(IUsersRepository usersRepository)
    {
        _usersRepository = usersRepository;
    }
    
    [Route("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Redirect("/");
    }

    [Route("login")]
    public IActionResult Login()
    {
        if (User.Identity?.IsAuthenticated == true)
            return Redirect("/admin");

        return View(new LoginViewModel());
    }
    
    [Route("login")]
    [HttpPost]
    public async Task<IActionResult> Login(LoginRequest loginRequest)
    {
        try
        {
            var user = await _usersRepository.Login(
                loginRequest.Username,
                loginRequest.PlainTextPassword);
            var principal = CookieAuthenticationHelper.GeneratePrincipal(user);
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                principal,
                new AuthenticationProperties()
                {
                    ExpiresUtc = DateTime.UtcNow.AddDays(14),
                    IsPersistent = true,
                    AllowRefresh = true
                });

            return Redirect("/admin");
        }
        catch (FrontendException ex)
        {
            return View(new LoginViewModel()
            {
                Errors = ex.FrontendMessage
            });
        }
        catch
        {
            return View(new LoginViewModel()
            {
                Errors = "Autenticazione fallita"
            });
        }
    }

}