// router
import { Outlet, NavLink } from "react-router-dom";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// components
import { TabNavigation } from "@/components/TabNavigation";

export const ProfilePage = () => {
    const navigationTitleClass = twMerge(
        classNames(
            "bg-neutral-400/50 text-neutral-500 flex justify-between items-center capitalize hover:bg-neutral-400 hover:text-neutral-600 transition dark:bg-neutral-600 dark:text-stone-200"
        )
    );
    const navigationLinkClass = twMerge(
        classNames(
            "inline-block w-full h-full [&.active]:bg-neutral-400 [&.active]:text-neutral-600 px-7 py-2 transition [&.active]:dark:bg-neutral-700 [&.active]:dark:text-stone-200"
        )
    );

    return (
        <div className="flex items-stretch h-full">
            <TabNavigation>
                <div className={navigationTitleClass}>
                    <NavLink to="overview" className={navigationLinkClass}>
                        overview
                    </NavLink>
                </div>
                {/* <div className={navigationTitleClass}>
                    <NavLink to="setting" className={navigationLinkClass}>
                        setting
                    </NavLink>
                </div> */}
            </TabNavigation>
            <Outlet />
        </div>
    );
};
