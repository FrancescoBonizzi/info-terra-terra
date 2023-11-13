import {KeyValuePair} from "../../model/KeyValuePair";

export class NewsletterIscrittiStatistics {
    public allNewsletterEmail: string[];
    public counters: KeyValuePair<string, string>[];

    constructor(allNewsletterEmail: string[]) {
        this.allNewsletterEmail = allNewsletterEmail;

        this.counters = [
            {
                key: "Numero iscritti alla newsletter",
                value: this.getNumeroIscrittiText()
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
