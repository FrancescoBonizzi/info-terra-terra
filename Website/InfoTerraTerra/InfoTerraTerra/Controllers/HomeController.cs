using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using InfoTerraTerra.Models;
using Microsoft.AspNetCore.Authorization;

namespace InfoTerraTerra.Controllers;

[AllowAnonymous]
public class HomeController : Controller
{
    [Route("/")]
    public IActionResult Index()
    {
        return View();
    }

    [Route("/privacy")]
    public IActionResult Privacy()
    {
        return View();
    }
    
    [Route("/aiutaci")]
    public IActionResult Aiutaci()
    {
        return View();
    }
    
    [Route("/manifesto")]
    public IActionResult Manifesto()
    {
        return View();
    }
    
    [Route("/volantini")]
    public IActionResult Volantini()
    {
        return View();
    }
    
    [Route("/newsletter")]
    public IActionResult Newsletter()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}