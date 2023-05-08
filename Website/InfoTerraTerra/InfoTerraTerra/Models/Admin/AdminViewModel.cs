using InfoTerraTerra_Library.Newsletter;
using InfoTerraTerra_Library.Tracking;

namespace InfoTerraTerra.Models.Admin;

public class AdminViewModel
{
    public NewsletterIscrittiStatistics NewsletterIscrittiStatistics { get; }
    public TrackingQrOpenStatistics TrackingQrOpenStatistics { get; }

    public AdminViewModel(
        NewsletterIscrittiStatistics newsletterIscrittiStatistics,
        TrackingQrOpenStatistics trackingQrOpenStatistics)
    {
        NewsletterIscrittiStatistics = newsletterIscrittiStatistics;
        TrackingQrOpenStatistics = trackingQrOpenStatistics;
    }
}