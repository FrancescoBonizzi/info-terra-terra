import {KeyValuePair} from "../../model/KeyValuePair";

export class NewsletterIscrittiStatistics {
    public allNewsletterEmail: string[];
    public lastIscrittoDate: string | null;
    public counters: KeyValuePair<string, string>[];

    constructor(allNewsletterEmail: string[], lastIscrittoDate: string | null) {
        this.allNewsletterEmail = allNewsletterEmail;
        this.lastIscrittoDate = lastIscrittoDate;

        this.counters = [
            {
                key: "Numero iscritti alla newsletter",
                value: this.getNumeroIscrittiText()
            },
            {
                key: "Data ultimo iscritto alla newsletter",
                value: this.lastIscrittoDate ?? "😟"
            }
        ];
    }

    private getNumeroIscrittiText(): string {
        switch (this.allNewsletterEmail.length) {
            case 0:
                return "Nessuno";
            case 1:
                return "Uno solo 🧐";
            default:
                return `${this.allNewsletterEmail.length} iscritti`;
        }
    }
}
