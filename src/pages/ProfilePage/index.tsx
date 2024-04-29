// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// utilities
import { addProject } from "@/utilities";
import { useProject } from "@/utilities/hook";

// component
import { ProfileCard } from "./ProjectCard";

export const ProfilePage = () => {
    const titleClass = twMerge(classNames("text-3xl"));
    const { projectInfo } = useProject();
    const mockProject = {
        domain: [],
        name: `sprintroll-${projectInfo.length}`,
        owner: "NZFKoR4Ax4V8wuoE304eiOXXWwq2",
    };

    const handleAddProject = () => {
        addProject(mockProject);
    };

    return (
        <div className="flex flex-col gap-6 p-8 mx-auto">
            <h3>ProfilePage</h3>
            <div className="flex flex-col gap-4">
                <h3 className={titleClass}>owned project</h3>
                <div className="flex flex-wrap gap-3">
                    {projectInfo.map((project) => (
                        <ProfileCard key={project.id} projectInfo={project} />
                    ))}

                    <button
                        className="bg-neutral-200 w-48 h-48 rounded p-5 flex flex-col"
                        onClick={handleAddProject}
                    >
                        + add project
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className={titleClass}>collaborative project</h3>
                {/* <div className="flex flex-wrap gap-3">
                    {projectInfo.map((project) => (
                        <ProfileCard key={project.id} projectInfo={project} />
                    ))}
                </div> */}
            </div>
        </div>
    );
};
