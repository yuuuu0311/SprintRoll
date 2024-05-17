import { Outlet } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { TabNavigation } from "@/components/TabNavigation/";

// hooks
import { useProject, useCollaborativeProject } from "@/utilities/hook";

export const ProjectPage = () => {
    const { projectInfo } = useProject();
    const { collaborativeProject } = useCollaborativeProject();

    return (
        <Layout>
            <TabNavigation
                kanban
                projectInfo={projectInfo}
                collaborativeProject={collaborativeProject}
            />
            <Outlet />
        </Layout>
    );
};
