using InfoTerraTerra_Library.Newsletter;
using InfoTerraTerra_Library.Tracking;
using InfoTerraTerra.Data;
using InfoTerraTerra.Models.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InfoTerraTerra.Controllers;

[Authorize]
public class AdminController : Controller
{
    private readonly TrackingRepository _trackingRepository;
    private readonly NewsletterRepository _newsletterRepository;

    public AdminController(
        TrackingRepository trackingRepository,
        NewsletterRepository newsletterRepository)
    {
        _trackingRepository = trackingRepository;
        _newsletterRepository = newsletterRepository;
    }

    [Route(Constants.AdminSlug)]
    public async Task<IActionResult> Index()
        => View(new AdminViewModel(
            await _newsletterRepository.GetStatistics(),
            await _trackingRepository.GetStatistics()));
}