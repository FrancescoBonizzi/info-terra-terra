using InfoTerraTerra_Library.Newsletter;

namespace InfoTerraTerra.Models.Admin;

public class AdminViewModel
{
    public KeyValuePair<string, string>[] Counters { get; }
    public NewsletterIscrittiStatistics NewsletterIscrittiStatistics { get; }

    public AdminViewModel(NewsletterIscrittiStatistics? newsletterIscrittiStatistics)
    {
        NewsletterIscrittiStatistics = newsletterIscrittiStatistics ??
                                       throw new ArgumentNullException(nameof(newsletterIscrittiStatistics));

        Counters = new[]
        {
            new KeyValuePair<string, string>("Numero iscritti", GetNumeroIscrittiText()),
            new KeyValuePair<string, string>("Data ultimo iscritto",
                NewsletterIscrittiStatistics.LastIscrittoDate ?? "😟"),
        };
    }

    private string GetNumeroIscrittiText()
    {
        return NewsletterIscrittiStatistics.AllNewsletterEmailCount switch
        {
            0 => "Nessuno",
            1 => "Uno solo 🧐",
            _ => $"{NewsletterIscrittiStatistics.AllNewsletterEmailCount} iscritti"
        };
    }
}