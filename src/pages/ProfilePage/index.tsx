import { Outlet, NavLink } from "react-router-dom";

// components
import { TabNavigation } from "@/components/TabNavigation";

export const ProfilePage = () => {
    return (
        <div className="flex items-stretch h-full">
            <TabNavigation>
                <NavLink to="overview">overview</NavLink>
                <NavLink to="setting">setting</NavLink>
            </TabNavigation>
            <Outlet />
        </div>
    );
};
