import {MetaDataHelper} from "../../services/MetaDataHelper";
import Constants from "../../Constants";
import {getServerSession} from "next-auth";
import {authConfig} from "../../services/AuthConfig";

const title = 'Admin';
export const metadata = MetaDataHelper.generateMetadata(
    Constants.AdminPageSlug,
    `${title} - ${Constants.SiteTitle}`,
    'Area riservata agli amministratori del sito.'
);

export default async function Page() {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
        // TODO: sicuro si potrà fare meglio di così
        return (
            <h1>Non autorizzato</h1>
        )
    }

    return (
        <div>
            <h1>Admin page - Da fare</h1>
            {session?.user &&
                <h2>Ciao {session.user.name}!</h2>
            }
        </div>
    )
}