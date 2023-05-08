namespace InfoTerraTerra_Library.Newsletter;

public class NewsletterIscrittiStatistics
{
    public string[] AllNewsletterEmail { get; }
    public string? LastIscrittoDate { get; }
    public KeyValuePair<string, string>[] Counters { get; }

    public NewsletterIscrittiStatistics(
        string[] allNewsletterEmail,
        string? lastIscrittoDate)
    {
        AllNewsletterEmail = allNewsletterEmail;
        LastIscrittoDate = lastIscrittoDate;
        
        Counters = new[]
        {
            new KeyValuePair<string, string>("Numero iscritti", GetNumeroIscrittiText()),
            new KeyValuePair<string, string>("Data ultimo iscritto", LastIscrittoDate ?? "😟"),
        };
    }
    
    private string GetNumeroIscrittiText()
    {
        return AllNewsletterEmail.Length switch
        {
            0 => "Nessuno",
            1 => "Uno solo 🧐",
            _ => $"{AllNewsletterEmail.Length} iscritti"
        };
    }
}