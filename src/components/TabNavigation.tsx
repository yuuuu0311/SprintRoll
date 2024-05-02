// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export const TabNavigation: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const wrapperClass = twMerge(
        classNames(
            "relative flex flex-col bg-stone-200 w-48 transition z-50 shadow-xl"
        )
    );

    return <div className={wrapperClass}>{children}</div>;
};
