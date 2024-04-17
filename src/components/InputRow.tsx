import { ChangeEvent, useState } from "react";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export const InputRow: React.FC<{
    label: string;
    value: string;
    placeholder: string;
    changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, placeholder, changeHandler }) => {
    const [isFocus, setIsFocus] = useState(false);

    const inputRowClass = twMerge(classNames(`flex flex-col gap-2 `));
    const labelClass = twMerge(classNames(`text-md text-blue-500 `));
    const inputClass = twMerge(
        classNames(
            `text-md px-3 py-2 rounded-md overflow-hidden leading-none outline-none transition `,
            {
                "bg-blue-300": isFocus,
            }
        )
    );

    return (
        <div className={inputRowClass}>
            <label htmlFor={label} className={labelClass}>
                {label}
            </label>
            <input
                type="text"
                name={label}
                id={label}
                placeholder={placeholder}
                value={value}
                className={inputClass}
                onChange={changeHandler}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            />
        </div>
    );
};
