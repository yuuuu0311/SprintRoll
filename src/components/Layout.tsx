// component
import { TabNavigation } from "@/components/TabNavigation/";

// hooks
import { useProject, useCollaborativeProject } from "@/utilities/hook";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { projectInfo } = useProject();
    const { collaborativeProject } = useCollaborativeProject();

    return (
        <div className="flex flex-col md:flex-row h-screen w-screen bg-neutral-300">
            <TabNavigation
                kanban
                projectInfo={projectInfo}
                collaborativeProject={collaborativeProject}
            />

            <main className="relative flex-1 overflow-hidden md:mt-0 mt-[40px]">
                {children}
            </main>
        </div>
    );
};
