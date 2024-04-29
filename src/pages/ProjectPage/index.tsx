import { Outlet } from "react-router-dom";
import { Layout } from "@/components/Layout";

export const ProjectPage = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};
