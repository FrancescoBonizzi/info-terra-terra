import {KeyValuePair} from "../../model/KeyValuePair";
import React from "react";

interface Props {
    counter: KeyValuePair<string, string>;
}

export const SubCounter = (props: Props) => {
    return (
        <div className="sub-counter-container">

            <div className="sub-counter-label">
                {props.counter.key}:
            </div>

            <div className="sub-counter-value">
                {props.counter.value}
            </div>

        </div>
    );
}