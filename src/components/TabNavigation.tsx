// router
import { NavLink } from "react-router-dom";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// components
import { TabAccordion } from "@/components/TabAccordion";

// hooks
import { useProject, useCollaborativeProject } from "@/utilities/hook";

// icon
import { MdOutlineSensorDoor } from "react-icons/md";

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
            <div className="mt-auto px-4 py-3 border-t-2 border-t-solid border-t-neutral-300/50 text-neutral-500 hover:bg-neutral-400/50 transition">
                <NavLink
                    to={`/profile`}
                    className="w-full h-full flex justify-between items-center"
                >
                    <span>profile</span>
                    <MdOutlineSensorDoor />
                </NavLink>
            </div>
        </div>
    );
};
