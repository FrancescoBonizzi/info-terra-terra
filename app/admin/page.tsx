import {MetaDataHelper} from "../../services/MetaDataHelper";
import Constants from "../../Constants";

const title = 'Admin';
export const metadata = MetaDataHelper.generateMetadata(
    Constants.AdminPageSlug,
    `${title} - ${Constants.SiteTitle}`,
    'Area riservata agli amministratori del sito.'
);


export default function Page() {
    return (
        <div>
            <h1>Admin page - Da fare</h1>
        </div>
    )
}