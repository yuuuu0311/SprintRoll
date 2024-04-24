import { useState } from "react";
import { NavLink } from "react-router-dom";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

enum NavigationLabel {
    // PERSON = "Personal",
    All = "All",
    FE = "FrontEnd",
    BE = "BackEnd",
    DATA = "Data",
    IOS = "ios",
}

const NavigationLabelArray = [
    // NavigationLabel.PERSON,
    NavigationLabel.All,
    NavigationLabel.FE,
    NavigationLabel.BE,
    NavigationLabel.DATA,
    NavigationLabel.IOS,
];

export const TabNavigation = () => {
    const [isActive, setIsActive] = useState(true);

    const wrapperClass = twMerge(
        classNames(
            "relative flex flex-col p-6 bg-stone-200 w-48 -translate-x-full transition z-50",
            {
                "translate-x-0": isActive,
            }
        )
    );

    const navLinkClass = (isActive: boolean) =>
        twMerge(
            classNames(
                "transition text-neutral-400 rounded-md py-2 px-3 bg-neutral-200",
                {
                    "bg-neutral-500 text-white": isActive,
                }
            )
        );

    const navigationLabelClass = twMerge(classNames("flex flex-col gap-2"));

    const handleToggle = () => {
        setIsActive((prev) => (prev ? false : true));
    };

    return (
        <div className={wrapperClass}>
            <div className={navigationLabelClass}>
                {NavigationLabelArray.map((label) => (
                    <NavLink
                        key={label}
                        to={`/${label.toLowerCase()}`}
                        className={({ isActive }) => navLinkClass(isActive)}
                    >
                        {label}
                    </NavLink>
                ))}
            </div>
            <div
                className="rounded-full h-14 w-14 justify-center items-center hidden bg-blue-500 bottom-5 -right-1/2 absolute z-"
                onClick={handleToggle}
            >
                toggle
            </div>
        </div>
    );
};
