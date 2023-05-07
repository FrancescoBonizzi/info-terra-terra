using InfoTerraTerra_Library;
using InfoTerraTerra_Library.Users;
using InfoTerraTerra.Data;
using InfoTerraTerra.Models.Auth;
using InfoTerraTerra.Requests;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InfoTerraTerra.Controllers;

public class AuthController : Controller
{
    private readonly IUsersRepository _usersRepository;

    public AuthController(IUsersRepository usersRepository)
    {
        _usersRepository = usersRepository;
    }
    
    [Route(Constants.Logout)]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Redirect("/");
    }

    [Route(Constants.LoginSlug)]
    [AllowAnonymous]
    public IActionResult Login()
    {
        if (User.Identity?.IsAuthenticated == true)
            return Redirect("/admin");

        return View(new LoginViewModel());
    }
    
    [Route(Constants.LoginSlug)]
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        try
        {
            var user = await _usersRepository.Login(
                request.Username,
                request.PlainTextPassword);
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