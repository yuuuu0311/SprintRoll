// router
import { NavLink } from "react-router-dom";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// utilities
import { addProject } from "@/utilities";
import { useProject } from "@/utilities/hook";

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
        <div>
            <h3>ProfilePage</h3>
            <div>
                <h3 className={titleClass}>owned project</h3>
                <ul>
                    {projectInfo.map((project) => (
                        <li key={project.id}>
                            <NavLink to={`/${project.name}/all`}>
                                {project.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <button onClick={handleAddProject}>add project</button>
            </div>
            <div>
                <h3 className={titleClass}>collaborative project</h3>
            </div>
        </div>
    );
};
