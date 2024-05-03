import { useState } from "react";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// icon
import { MdMenu } from "react-icons/md";

export const TabNavigation: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isActive, setIsActive] = useState(false);

    const wrapperClass = twMerge(
        classNames(
            "md:relative fixed top-0 flex flex-col bg-stone-200 w-full md:w-48 transition z-50 shadow-xl dark:bg-neutral-500"
        )
    );

    const childrenWrapClass = twMerge(
        classNames(
            "relative max-h-0 overflow-hidden transition-all bg-stone-200 z-50",
            {
                "max-h-[999px]": isActive,
            }
        )
    );

    const backdropClass = twMerge(
        classNames(" opacity-0 transition", {
            "block fixed w-screen h-screen bg-neutral-700 opacity-60": isActive,
        })
    );

    return (
        <div className={wrapperClass}>
            <div className="flex justify-between md:hidden px-4 py-2 z-50 bg-stone-200">
                <div className="flex gap-2 text-neutral-500 font-bold">
                    SprintRoll
                </div>
                <MdMenu
                    className="w-6 h-6 aspect-square text-right"
                    onClick={() => setIsActive((prev) => !prev)}
                />
            </div>
            <div className={childrenWrapClass}>{children}</div>
            <div
                className={backdropClass}
                onClick={() => setIsActive((prev) => !prev)}
            ></div>
        </div>
    );
};
