using System.Diagnostics;
using InfoTerraTerra_Library.Tracking;
using InfoTerraTerra.AspNetCore;
using InfoTerraTerra.Data;
using Microsoft.AspNetCore.Mvc;
using InfoTerraTerra.Models;
using Microsoft.AspNetCore.Authorization;

namespace InfoTerraTerra.Controllers;

[AllowAnonymous]
public class HomeController : Controller
{
    private readonly TrackingRepository _trackingRepository;

    public HomeController(TrackingRepository trackingRepository)
    {
        _trackingRepository = trackingRepository;
    }

    [Route(Constants.HomePageSlug)]
    public IActionResult Index()
    {
        return View();
    }

    [Route(Constants.PrivacyPageSlug)]
    public IActionResult Privacy()
    {
        return View();
    }

    [Route(Constants.AiutaciPageSlug)]
    public IActionResult Aiutaci()
    {
        return View();
    }

    [Route(Constants.ManifestoPageSlug)]
    public IActionResult Manifesto()
    {
        return View();
    }

    [Route(Constants.VolantiniPageSlug)]
    public IActionResult Volantini()
    {
        return View();
    }

    [Route("/newsletter")]
    public IActionResult Newsletter()
    {
        return View();
    }

    [Route($"{Constants.VolantinoPageSlug}/{{id:int}}")]
    public IActionResult Volantino(int id)
    {
        var volantino = Voltantini.All.FirstOrDefault(v => v.Id == id);
        if (volantino == null)
        {
            return Redirect(@Constants.VolantiniPageSlug);
        }

        return View(new VolantinoViewModel
        {
            Volantino = volantino
        });
    }

    [Route($"/{Constants.QrPageSlug}/{{idVolantino:int?}}/{{citta?}}/{{via?}}/{{luogo?}}")]
    public async Task<IActionResult> Qr(
        int? idVolantino = null, 
        string? citta = null, 
        string? via = null, 
        string? luogo = null)
    {
        var trackingSlug = new TrackingSlug()
        {
            IdVolantino = idVolantino,
            Citta = citta,
            Via = via,
            Luogo = luogo,
            Slug = HttpContext.Request.Path
        };
            
        await _trackingRepository.InsertQrOpenAsync(new QrOpen
        {
            Ip = HttpContext.GetRemoteIpAddress(),
            Os = HttpContext.GetOs(),
            Referer = HttpContext.GetReferer(),
            TrackingSlug = trackingSlug
        });

        if (trackingSlug.IdVolantino == null)
            return Redirect(Constants.VolantiniPageSlug);

        var volantino = Voltantini.All.FirstOrDefault(v => v.Id == trackingSlug.IdVolantino);

        if (volantino == null)
            return Redirect(Constants.VolantiniPageSlug);

        return Redirect($"{Constants.VolantinoPageSlug}/{volantino.Id}");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}