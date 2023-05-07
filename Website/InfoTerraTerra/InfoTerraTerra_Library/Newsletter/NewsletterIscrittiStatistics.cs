namespace InfoTerraTerra_Library.Newsletter;

public class NewsletterIscrittiStatistics
{
    public string[] AllNewsletterEmail { get; set; }
    public int AllNewsletterEmailCount => AllNewsletterEmail.Length;
    public string? LastIscrittoDate { get; set; }
}