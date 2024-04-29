import { useState } from "react";
import { NavLink } from "react-router-dom";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// icon
import { MdExpandMore } from "react-icons/md";

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
    project: string;
}> = ({ project }) => {
    const [isActive, setIsActive] = useState(false);

    const navLinkClass = (isActive: boolean) =>
        twMerge(
            classNames(
                "transition text-neutral-400 rounded-md py-2 px-3 bg-neutral-200",
                {
                    "text-neutral-500": isActive,
                }
            )
        );

    const navigationTitleClass = twMerge(
        classNames(
            "bg-neutral-500 text-stone-100 px-4 py-2 flex justify-between items-center capitalize"
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
                <span>{project}</span>
                <MdExpandMore className={navigationTitleIconClass} />
            </div>
            <ul className={navigationWrapClass}>
                {NavigationLabelArray.map((label, index) => (
                    <li key={`${project}-${label}-${index}`}>
                        <NavLink
                            to={`/${project.toLocaleLowerCase()}/${label.toLowerCase()}`}
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
