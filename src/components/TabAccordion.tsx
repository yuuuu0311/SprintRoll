import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// icon
import { MdExpandMore } from "react-icons/md";

// interface
import { ProjectFace } from "@/interface";

enum NavigationLabel {
    // PERSON = "Personal",
    All = "All",
    FE = "FrontEnd",
    BE = "BackEnd",
    DATA = "Data",
    IOS = "iOS",
}

const NavigationLabelArray = [
    // NavigationLabel.PERSON,
    NavigationLabel.All,
    NavigationLabel.FE,
    NavigationLabel.BE,
    NavigationLabel.DATA,
    NavigationLabel.IOS,
];

export const TabAccordion: React.FC<{
    projectInfo: ProjectFace;
}> = ({ projectInfo }) => {
    const { project } = useParams();
    const [isActive, setIsActive] = useState<boolean>(
        () => projectInfo.name === project
    );

    const navLinkClass = (isActive: boolean) =>
        twMerge(
            classNames(
                "transition-all text-neutral-400 rounded-md py-2 px-3 bg-neutral-200 hover:pl-5 dark:bg-neutral-500 dark:text-stone-400",
                {
                    "text-neutral-500 dark:text-stone-300": isActive,
                }
            )
        );

    const navigationTitleClass = twMerge(
        classNames(
            "bg-neutral-400/50 text-neutral-500 px-7 py-2 flex justify-between items-center capitalize hover:bg-neutral-400 hover:text-neutral-600 transition dark:bg-neutral-600 dark:text-stone-200",
            {
                "bg-neutral-400 text-neutral-600 dark:bg-neutral-700 dark:text-stone-200":
                    isActive,
            }
        )
    );

    const navigationTitleIconClass = twMerge(
        classNames("transition", { "rotate-180 ": isActive })
    );

    const navigationWrapClass = twMerge(
        classNames(
            "flex flex-col gap-2 px-4 py-0 overflow-hidden h-0 transition-all",
            {
                "h-500 py-4": isActive,
            }
        )
    );

    return (
        <div>
            <div
                onClick={() => setIsActive((prev) => !prev)}
                className={navigationTitleClass}
            >
                <span>{projectInfo.name}</span>
                <MdExpandMore className={navigationTitleIconClass} />
            </div>
            <ul className={navigationWrapClass}>
                {NavigationLabelArray.map((label) => (
                    <li key={`${projectInfo.id}-${label}`}>
                        <NavLink
                            to={`/${projectInfo.name.toLocaleLowerCase()}/${label.toLowerCase()}`}
                            className={({ isActive }) => navLinkClass(isActive)}
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};
