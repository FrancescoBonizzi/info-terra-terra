import React from "react";

interface Props {
    errors?: string | null
}

export const FormError = (props: Props) => {

    if (!props.errors)
        return null;

    return (
        <div className="transparent-rounded-form text-color-error margin-top-1rem margin-bottom-0rem">
            <h4 className="padding0 margin0 text-align-center">{props.errors}</h4>
        </div>
    );
}