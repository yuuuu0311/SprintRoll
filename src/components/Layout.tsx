// router
import { NavLink } from "react-router-dom";

// component
import { TabNavigation } from "@/components/TabNavigation";
import { TabAccordion } from "@/components/TabAccordion";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// hooks
import { useProject, useCollaborativeProject } from "@/utilities/hook";

// icon
import { MdOutlineSensorDoor } from "react-icons/md";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { projectInfo } = useProject();
    const { collaborativeProject } = useCollaborativeProject();
    const navigationWrapClass = twMerge(classNames("flex flex-col"));

    return (
        <div className="flex h-screen w-screen bg-neutral-300 dark:bg-neutral-800">
            <TabNavigation>
                <div className={navigationWrapClass}>
                    {projectInfo?.map((project) => (
                        <TabAccordion projectInfo={project} key={project.id} />
                    ))}
                    {collaborativeProject?.map((project) => (
                        <TabAccordion projectInfo={project} key={project.id} />
                    ))}
                </div>
                <div className="mt-auto px-4 py-3 border-t-2 border-t-solid border-t-neutral-300/50 text-neutral-500 hover:bg-neutral-400/50 transition dark:bg-neutral-600 dark:text-stone-200 dark:border-t-neutral-500/50">
                    <NavLink
                        to={`/profile/overview`}
                        className="w-full h-full flex justify-between items-center"
                    >
                        <span>profile</span>
                        <MdOutlineSensorDoor />
                    </NavLink>
                </div>
            </TabNavigation>

            <main className="relative flex-1 overflow-hidden">{children}</main>
        </div>
    );
};
