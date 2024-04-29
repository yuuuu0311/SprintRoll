// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// components
import { TabAccordion } from "@/components/TabAccordion";

export const TabNavigation = () => {
    const wrapperClass = twMerge(
        classNames("relative flex flex-col bg-stone-200 w-48 transition z-50")
    );

    const navigationWrapClass = twMerge(classNames("flex flex-col"));

    return (
        <div className={wrapperClass}>
            <div className={navigationWrapClass}>
                <TabAccordion project={"sprintroll-0"} />
                <TabAccordion project={"sprintroll-1"} />
                <TabAccordion project={"sprintroll-2"} />
            </div>
        </div>
    );
};
