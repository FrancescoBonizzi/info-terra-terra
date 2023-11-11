import {KeyValuePair} from "../../model/KeyValuePair";

interface Props {
    counter: KeyValuePair<string, string>;
}

export const Counter = (props: Props) => {
    return (
        <div className="counter-container">

            @if (!string.IsNullOrWhiteSpace(Model.Category))
            {
                <div className="counter-category">
                    @Model.Category
                </div>
            }

            <div className="counter-label">
                {props.counter.key}
            </div>

            <div className="counter-value">
                {props.counter.value}
            </div>

        </div>
    )
}