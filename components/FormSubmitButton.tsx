import {useFormStatus} from "react-dom";
import React from "react";
import {BounceLoader} from "react-spinners";

interface Props {
    text: string;
}

export const FormSubmitButton = (props: Props) => {

    const {pending} = useFormStatus();

    return (
        <div className="form-row">
            {pending &&
                <div className="flex-horizontal-center margin-top-1rem">
                    <BounceLoader
                        color='#86C342'
                        loading={pending}
                        size={50}
                    />
                </div>
            }

            {!pending &&
                <input type="submit" value={props.text}/>
            }
        </div>
    );
}