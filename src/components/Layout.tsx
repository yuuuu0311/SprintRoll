// import { useState } from "react";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// component
import { TabNavigation } from "@/components/TabNavigation";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // const [isDarkMode, setIsDarkMode] = useState(false);

    const wrapperClass = classNames(
        twMerge(
            "flex h-screen w-screen bg-gray-500"
            // isDarkMode && "bg-blue-500"
        )
    );

    const contentClass = classNames(twMerge("flex-1"));

    return (
        <div className={wrapperClass}>
            <TabNavigation />
            <main className={contentClass}>{children}</main>
        </div>
    );
};
