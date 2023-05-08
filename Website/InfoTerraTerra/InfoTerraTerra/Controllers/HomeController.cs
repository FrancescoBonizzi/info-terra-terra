using System.Diagnostics;
using InfoTerraTerra_Library;
using InfoTerraTerra_Library.Newsletter;
using InfoTerraTerra_Library.Tracking;
using InfoTerraTerra_Library.Volantini;
using InfoTerraTerra.AspNetCore;
using InfoTerraTerra.Data;
using Microsoft.AspNetCore.Mvc;
using InfoTerraTerra.Models;
using InfoTerraTerra.Models.Home;
using InfoTerraTerra.Models.Newsletter;
using Microsoft.AspNetCore.Authorization;

namespace InfoTerraTerra.Controllers;

[AllowAnonymous]
public class HomeController : Controller
{
    private readonly TrackingRepository _trackingRepository;
    private readonly NewsletterRepository _newsletterRepository;
    private readonly VolantiniRepository _volantiniRepository;

    public HomeController(
        TrackingRepository trackingRepository,
        NewsletterRepository newsletterRepository,
        VolantiniRepository volantiniRepository)
    {
        _trackingRepository = trackingRepository;
        _newsletterRepository = newsletterRepository;
        _volantiniRepository = volantiniRepository;
    }

    [Route(Constants.HomePageSlug)]
    public async Task<IActionResult> Index()
    {
        return View(new IndexViewModel()
        {
            Volantini = (await _volantiniRepository.GetAll())
                .OrderByDescending(v => v.Date)
                .Take(3)
                .ToArray()
        });
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
    public async Task<IActionResult> Volantini()
    {
        return View(new VolantiniViewModel()
        {
            Volantini = (await _volantiniRepository.GetAll())
                .OrderByDescending(v => v.Date)
                .ToArray()
        });
    }

    [Route(Constants.NewsletterPageSlug)]
    public IActionResult Newsletter()
    {
        return View(new NewsletterViewModel());
    }

    [Route(Constants.NewsletterPageSlug)]
    [HttpPost]
    public async Task<IActionResult> Newsletter(NewsletterIscrizioneRequest request)
    {
        try
        {
            await _newsletterRepository.InsertEmailAddressAsync(request.Email);
            return View(new NewsletterViewModel()
            {
                Success = "Grazie per esserti iscritto alla newsletter! A presto!"
            });
        }
        catch (FrontendException ex)
        {
            return View(new NewsletterViewModel()
            {
                Errors = ex.FrontendMessage
            });
        }
        catch
        {
            return View(new NewsletterViewModel()
            {
                Errors = "Ooops! Qualcosa è andato storto. Riprova più tardi."
            });
        }
    }

    [Route($"{Constants.VolantinoPageSlug}/{{id:int}}")]
    public async Task<IActionResult> Volantino(int id)
    {
        var volantino = await _volantiniRepository.GetVolantino(id);
        if (volantino == null)
        {
            return Redirect(@Constants.VolantiniPageSlug);
        }

        return View(new VolantinoViewModel
        {
            Volantino = volantino
        });
    }
    
    [Route($"{Constants.VolantinoPageSlug}/{{slug}}")]
    public async Task<IActionResult> Volantino(string slug)
    {
        var volantino = await _volantiniRepository.GetVolantino(slug);
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

        var volantino = await _volantiniRepository.GetVolantino(trackingSlug.IdVolantino.Value);

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