import className from "classnames";

import { twMerge } from "tailwind-merge";

export const SwitchButton: React.FC<{
    usingTemplate: boolean;
    changeHandler: () => void;
}> = ({ usingTemplate, changeHandler }) => {
    const switchWrapClasses = twMerge(
        className(
            "overflow-hidden relative flex p-1 items-center w-12 h-6 rounded-full transition bg-neutral-300",
            {
                "bg-lime-500": true && usingTemplate,
            }
        )
    );
    const switchBtnClass = twMerge(
        className(
            "h-full w-auto rounded-full aspect-square bg-white transition-all",
            {
                // "bg-neutral-300 ": true,
                "ml-auto": true && usingTemplate,
            }
        )
    );

    const iconClasses = twMerge(
        className("appearance-none w-full h-full transition absolute")
    );

    return (
        <label htmlFor="switch-button" className={switchWrapClasses}>
            <input
                className={iconClasses}
                type="checkbox"
                name="switch-button"
                id="switch-button"
                hidden
                checked={usingTemplate}
                onChange={changeHandler}
            />
            <span className={switchBtnClass}></span>
        </label>
    );
};
