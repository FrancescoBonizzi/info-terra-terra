﻿using System.Diagnostics;
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

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}