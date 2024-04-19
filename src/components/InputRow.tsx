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

    const inputClass = twMerge(
        classNames(
            `text-md px-3 py-2 rounded-md overflow-hidden leading-none outline-none transition `,
            {
                "bg-neutral-300": isFocus,
            }
        )
    );

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={label} className="text-md text-neutral-500 ">
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
