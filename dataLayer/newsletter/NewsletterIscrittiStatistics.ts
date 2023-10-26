class NewsletterIscrittiStatistics {
    public AllNewsletterEmail: string[];
    public LastIscrittoDate: string | null;
    public Counters: [string, string][];

    constructor(allNewsletterEmail: string[], lastIscrittoDate: string | null) {
        this.AllNewsletterEmail = allNewsletterEmail;
        this.LastIscrittoDate = lastIscrittoDate;

        this.Counters = [
            ["Numero iscritti alla newsletter", this.getNumeroIscrittiText()],
            ["Data ultimo iscritto alla newsletter", this.LastIscrittoDate ?? "😟"],
        ];
    }

    private getNumeroIscrittiText(): string {
        switch (this.AllNewsletterEmail.length) {
            case 0:
                return "Nessuno";
            case 1:
                return "Uno solo 🧐";
            default:
                return `${this.AllNewsletterEmail.length} iscritti`;
        }
    }
}
