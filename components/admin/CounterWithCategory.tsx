import {KeyValuePair} from "../../model/KeyValuePair";
import React from "react";
import {SubCounter} from "./SubCounter";

interface Props {
    title: string;
    subCounters: KeyValuePair<string, string>[];
}

export const CounterWithCategory = (props: Props) => {

    if (props.subCounters.length === 0) {
        return null;
    }

    return (
        <div className="counter-container">
            <div className="counter-category">{props.title}</div>
            <div className="flex-row-wrap">
                {props.subCounters.map(counter => (
                    <SubCounter
                        key={counter.key}
                        counter={counter}/>
                ))}
            </div>
        </div>
    );
}