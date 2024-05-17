// router
import { Outlet } from "react-router-dom";

// components
import { Layout } from "@/components/Layout";
import { TabNavigation } from "@/components/TabNavigation/";

export const ProfilePage = () => {
    return (
        <Layout>
            <TabNavigation profile />
            <main className="relative flex-1 overflow-hidden md:mt-0 mt-[40px]">
                <Outlet />
            </main>
        </Layout>
    );
};
