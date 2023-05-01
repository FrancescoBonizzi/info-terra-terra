using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InfoTerraTerra.Controllers;

[Authorize]
public class AdminController : Controller
{
    [Route("/admin")]
    public IActionResult Index()
    {
        return View();
    }
}