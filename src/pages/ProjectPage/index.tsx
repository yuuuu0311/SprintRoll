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
            <div className="mt-[40px] md:mt-0 flex-1 overflow-auto">
                <Outlet />
            </div>
        </Layout>
    );
};
