import { useState } from "react";
import { Link } from "react-router-dom";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

enum NavigationLabel {
    PERSON = "Personal",
    All = "All",
    FE = "FrontEnd",
    BE = "BackEnd",
    DATA = "Data",
    IOS = "ios",
}

const NavigationLabelArray = [
    NavigationLabel.PERSON,
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
            "relative flex flex-col p-6 bg-blue-200 w-48 -translate-x-full transition z-50",
            {
                "translate-x-0": isActive,
            }
        )
    );

    const navigationLabelClass = classNames(twMerge("flex flex-col gap-2"));

    const handleToggle = () => {
        setIsActive((prev) => (prev ? false : true));
    };

    return (
        <div className={wrapperClass}>
            <div className={navigationLabelClass}>
                {NavigationLabelArray.map((label) => (
                    <Link
                        key={label}
                        to={`/${label.toLowerCase()}`}
                        className="text-blue-500"
                    >
                        {label}
                    </Link>
                ))}
            </div>
            <div
                className="rounded-full h-14 w-14 flex justify-center items-center bg-blue-500 bottom-5 -right-1/2 absolute z-"
                onClick={handleToggle}
            >
                toggle
            </div>
        </div>
    );
};
