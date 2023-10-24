import {Volantino} from "../model/Volantino";

export const VolantinoPreviewCard = (props: Volantino) => {
    return (
        <div className="homepage-volantino-container">

            <div className="homepage-volantino-image-text-container">
                <img
                    src={`/images/${props.imageNameFronte}`}
                    alt="La foto del volatino @Model.Title"/>
                <div className="homepage-volantino-text-container">

                    <div className="badge-container partial-volantino-badge-container">
                        {props.hashTags.map((hashTag) =>
                            <span key={hashTag} className="text-less-important-badge">{hashTag}</span>
                        )}
                    </div>

                    <div className="flex-vertical">
                        <span className="partial-volantino-title">{props.title}</span>
                        <span className="partial-volantino-date">{props.formattedDate}</span>
                    </div>

                    <p className="partial-volantino-description">{props.description}…</p>
                    <a className="action-button-secondary centered-in-mobile" href={props.pageUrl}>Leggi di
                        più &rsaquo;</a>
                </div>
            </div>
        </div>
    )
};