// import { Dispatch, SetStateAction } from "react";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export const Dialog: React.FC<{
    children: React.ReactNode;
    handleDialogToggle: () => void;
}> = ({ children, handleDialogToggle }) => {
    const wrapperClass = twMerge(classNames("fixed w-screen h-screen inset-0"));
    const backdropClass = twMerge(
        classNames("absolute bg-gray-700 opacity-60 w-full h-full z-0")
    );
    const dialogClass = twMerge(
        classNames(
            "absolute bg-white w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        )
    );

    return (
        <div className={wrapperClass}>
            <div className={backdropClass} onClick={handleDialogToggle}>
                backdrop
            </div>
            <div className={dialogClass}>
                <div>title</div>
                {children}
            </div>
        </div>
    );
};
