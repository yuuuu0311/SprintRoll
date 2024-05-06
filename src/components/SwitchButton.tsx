import className from "classnames";

import { twMerge } from "tailwind-merge";

export const SwitchButton: React.FC<{
    usingTemplate: boolean;
    changeHandler: () => void;
}> = ({ usingTemplate, changeHandler }) => {
    const toggleBtnClasses = twMerge(
        className(
            "overflow-hidden relative flex p-0.5 items-center w-12 h-6 rounded-full before:content-[''] before:bg-white before:rounded-full before:h-5 before:w-5 before:transition transition",
            {
                "bg-neutral-300 ": true,
                "bg-lime-500 before:translate-x-6": true && usingTemplate,
            }
        )
    );

    const iconClasses = twMerge(
        className("appearance-none w-full h-full transition absolute")
    );

    return (
        <div className={toggleBtnClasses}>
            <input
                className={iconClasses}
                type="checkbox"
                name="switch-button"
                checked={usingTemplate}
                onChange={changeHandler}
            />
        </div>
    );
};
