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

export const TabNavigation = () => {
    const wrapperClass = classNames(
        twMerge(
            "flex flex-col p-6 bg-blue-200"
            // isDarkMode && "bg-blue-500"
        )
    );

    return (
        <div className={wrapperClass}>
            <ul>
                <li>{NavigationLabel.PERSON}</li>
                <li>{NavigationLabel.All}</li>
                <li>{NavigationLabel.FE}</li>
                <li>{NavigationLabel.BE}</li>
                <li>{NavigationLabel.DATA}</li>
                <li>{NavigationLabel.IOS}</li>
            </ul>
        </div>
    );
};
