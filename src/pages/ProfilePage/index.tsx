// router
import { Outlet } from "react-router-dom";

// components
import { TabNavigation } from "@/components/TabNavigation/";

export const ProfilePage = () => {
    return (
        <div className="flex flex-col md:flex-row items-stretch h-full">
            <TabNavigation profile />
            <Outlet />
        </div>
    );
};
