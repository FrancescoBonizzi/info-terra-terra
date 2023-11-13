import {KeyValuePair} from "../../model/KeyValuePair";
import StringHelper from "../../services/StringHelper";

interface Props {
    category?: string;
    counter: KeyValuePair<string, string>;
}

export const Counter = (props: Props) => {
    return (
        <div className="counter-container">

            {!StringHelper.isNullOrWhitespace(props.category) &&
                <div className="counter-category">
                    {props.category}
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