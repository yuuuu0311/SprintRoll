import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// icon
import { MdMenu } from "react-icons/md";
import { MdOutlineSensorDoor } from "react-icons/md";

//interface
import { ProjectFace } from "@/interface";

//component
import { Accordion } from "./Accordion";

export const TabNavigation: React.FC<{
    profile?: boolean;
    kanban?: boolean;
    projectInfo?: ProjectFace[] | undefined;
    collaborativeProject?: ProjectFace[] | undefined;
}> = ({ projectInfo, collaborativeProject, profile, kanban }) => {
    const isMobileDevice = window.matchMedia("(max-width: 767px)");
    const { project, domain } = useParams();
    const [isActive, setIsActive] = useState(() => !isMobileDevice.matches);

    const wrapperClass = twMerge(
        classNames(
            "md:relative fixed top-0 flex flex-col bg-stone-200 w-full md:w-48 transition z-50 shadow-xl dark:bg-neutral-500"
        )
    );

    const childrenWrapClass = twMerge(
        classNames(
            "relative max-h-0 overflow-y-auto overflow-x-hidden no-scrollbar transition-all bg-stone-200 z-50",
            {
                "max-h-[999px]": isActive,
            }
        )
    );
    const navigationWrapClass = twMerge(classNames("flex flex-col"));

    const navigationTitleClass = twMerge(
        classNames(
            "bg-neutral-400/50 text-neutral-500 flex justify-between items-center capitalize hover:bg-neutral-400 hover:text-neutral-600 transition"
        )
    );
    const navigationLinkClass = twMerge(
        classNames(
            "inline-block w-full h-full [&.active]:bg-neutral-400 [&.active]:text-neutral-600 px-7 py-2 transition [&.active]:dark:bg-neutral-700 [&.active]:dark:text-stone-200"
        )
    );

    const backdropClass = twMerge(
        classNames("md:hidden opacity-0 transition", {
            "block md:hidden fixed w-screen h-screen bg-neutral-700 opacity-60":
                isActive,
        })
    );

    useEffect(() => {
        if (isMobileDevice.matches) {
            setIsActive(false);
        } else {
            return;
        }
    }, [domain, project]);

    return (
        <div className={wrapperClass}>
            {profile && (
                <div className={navigationTitleClass}>
                    <NavLink to="overview" className={navigationLinkClass}>
                        overview
                    </NavLink>
                </div>
            )}

            {kanban && (
                <>
                    <div className="flex justify-between md:hidden px-4 py-2 z-50 bg-stone-200">
                        <div className="flex gap-2 text-neutral-500 font-bold">
                            <NavLink to="/">SprintRoll</NavLink>
                        </div>
                        <MdMenu
                            className="w-6 h-6 aspect-square text-right"
                            onClick={() => setIsActive((prev) => !prev)}
                        />
                    </div>
                    <div className={childrenWrapClass}>
                        <div className={navigationWrapClass}>
                            {projectInfo?.map((project) => (
                                <Accordion
                                    projectInfo={project}
                                    key={project.id}
                                />
                            ))}
                            {collaborativeProject?.map((project) => (
                                <Accordion
                                    projectInfo={project}
                                    key={project.id}
                                />
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
                    </div>
                    <div
                        className={backdropClass}
                        onClick={() => setIsActive((prev) => !prev)}
                    ></div>
                </>
            )}
        </div>
    );
};
