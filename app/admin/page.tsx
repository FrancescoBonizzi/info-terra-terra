import {MetaDataHelper} from "../../services/MetaDataHelper";
import Constants from "../../Constants";
import {getServerSession} from "next-auth";
import {authConfig} from "../../services/AuthConfig";
import {redirect} from "next/navigation";

const title = 'Admin';
export const metadata = MetaDataHelper.generateMetadata(
    Constants.AdminPageSlug,
    `${title} - ${Constants.SiteTitle}`,
    'Area riservata agli amministratori del sito.'
);

export default async function Page() {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
        return redirect(Constants.LoginPageSlug);
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