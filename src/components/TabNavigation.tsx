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
    const wrapperClass = classNames(twMerge("flex flex-col p-6 bg-blue-200"));
    const navigationLabelClass = classNames(twMerge("flex flex-col"));

    return (
        <div className={wrapperClass}>
            <div className={navigationLabelClass}>
                {NavigationLabelArray.map((label) => (
                    <Link key={label} to={`/${label}`}>
                        {label}
                    </Link>
                ))}
            </div>
        </div>
    );
};
