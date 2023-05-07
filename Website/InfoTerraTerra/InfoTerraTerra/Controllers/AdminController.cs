using InfoTerraTerra.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InfoTerraTerra.Controllers;

[Authorize]
public class AdminController : Controller
{
    [Route(Constants.AdminSlug)]
    public IActionResult Index()
    {
        return View();
    }
}