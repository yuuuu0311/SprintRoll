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
        <div className="flex flex-col md:flex-row h-screen w-screen bg-neutral-300">
            <TabNavigation>
                <div className={navigationWrapClass}>
                    {projectInfo?.map((project) => (
                        <TabAccordion projectInfo={project} key={project.id} />
                    ))}
                    {collaborativeProject?.map((project) => (
                        <TabAccordion projectInfo={project} key={project.id} />
                    ))}
                </div>
                <div className="mt-auto sticky bottom-0 px-4 py-3 border-t-2 border-t-solid bg-neutral-300 border-t-neutral-300/50 text-neutral-500 hover:bg-neutral-400 transition">
                    <NavLink
                        to={`/profile/overview`}
                        className="w-full h-full flex justify-between items-center"
                    >
                        <span>profile</span>
                        <MdOutlineSensorDoor />
                    </NavLink>
                </div>
            </TabNavigation>

            <main className="relative flex-1 overflow-hidden md:mt-0 mt-[40px]">
                {children}
            </main>
        </div>
    );
};
