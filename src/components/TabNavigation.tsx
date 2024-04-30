// router
import { NavLink } from "react-router-dom";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// components
import { TabAccordion } from "@/components/TabAccordion";

// hooks
import { useProject, useCollaborativeProject } from "@/utilities/hook";

export const TabNavigation = () => {
    const { projectInfo } = useProject();
    const { collaborativeProject } = useCollaborativeProject();

    const wrapperClass = twMerge(
        classNames("relative flex flex-col bg-stone-200 w-48 transition z-50")
    );

    const navigationWrapClass = twMerge(classNames("flex flex-col"));

    return (
        <div className={wrapperClass}>
            <div className={navigationWrapClass}>
                {projectInfo?.map((project) => (
                    <TabAccordion projectInfo={project} key={project.id} />
                ))}
                {collaborativeProject?.map((project) => (
                    <TabAccordion projectInfo={project} key={project.id} />
                ))}
            </div>
            <div className="mt-auto px-4 py-2">
                <NavLink to={`/profile`}>profile</NavLink>
            </div>
        </div>
    );
};
