// import { Dispatch, SetStateAction } from "react";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export const Dialog: React.FC<{
    children: React.ReactNode;
    title: string;
    handleDialogToggle: () => void;
}> = ({ children, handleDialogToggle, title }) => {
    const wrapperClass = twMerge(
        classNames("fixed w-screen h-screen inset-0 backdrop-blur-md")
    );
    const backdropClass = twMerge(
        classNames("fixed bg-neutral-700 opacity-60 w-full h-full z-0")
    );
    const dialogClass = twMerge(
        classNames(
            "flex flex-col absolute bg-white w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden bg-neutral-200"
        )
    );
    const titleClass = twMerge(
        classNames(
            "px-6 pt-4 pb-2 font-bold text-lg text-neutral-700 capitalize text-stone-100 bg-neutral-700"
        )
    );
    const contentClass = twMerge(classNames("flex flex-col flex-1 px-6 py-4"));

    return (
        <div className={wrapperClass}>
            <div className={backdropClass} onClick={handleDialogToggle}></div>
            <div className={dialogClass}>
                <div className={titleClass}>{title}</div>
                <div className={contentClass}>{children}</div>
            </div>
        </div>
    );
};
