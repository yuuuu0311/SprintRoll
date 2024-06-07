import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// icon
import { MdExpandMore } from "react-icons/md";

// interface
import { ProjectFace } from "@/interface";

import { db } from "@/utilities/firebase";
import { doc, updateDoc } from "firebase/firestore";

import { Button } from "@/components/Button";

export const Accordion: React.FC<{
    projectInfo: ProjectFace;
}> = ({ projectInfo }) => {
    const { project } = useParams();
    const [isActive, setIsActive] = useState<boolean>(
        () => projectInfo.name === project
    );
    const [isAddDomain, setIsAddDomain] = useState<boolean>(false);
    const [newDomain, setNewDomain] = useState<string>("");

    const navLinkClass = (isActive: boolean) =>
        twMerge(
            classNames(
                "transition-all text-neutral-400 opacity-50 rounded-md my-2 px-3 bg-neutral-200 hover:opacity-100 hover:text-neutral-700 line-clamp-1 text-ellipsis break-words cursor-pointer",
                {
                    "text-neutral-700 opacity-100": isActive,
                }
            )
        );

    const navigationTitleClass = twMerge(
        classNames(
            "bg-neutral-400/50 text-neutral-500 px-7 py-2 gap-4 flex justify-between items-center capitalize hover:bg-neutral-400 hover:text-neutral-600 transition sticky top-0 z-10",
            {
                "bg-neutral-400 text-neutral-600": isActive,
            }
        )
    );

    const navigationTitleIconClass = twMerge(
        classNames("transition", { "rotate-180 ": isActive })
    );

    const navigationWrapClass = twMerge(
        classNames("grid grid-rows-[0] px-4 py-0 transition-all", {
            "grid-rows-1 py-4": isActive,
        })
    );

    const handleAddDomain = async (newDomain: string) => {
        const projectRef = doc(db, `projects/${projectInfo.id}/`);
        await updateDoc(projectRef, {
            domain: [...projectInfo.domain, newDomain],
        });
    };

    return (
        <div>
            <div
                onClick={() => setIsActive((prev) => !prev)}
                className={navigationTitleClass}
            >
                <span className="line-clamp-1 flex-1 break-words text-ellipsis">
                    {projectInfo.name}
                </span>
                <MdExpandMore className={navigationTitleIconClass} />
            </div>
            <div className={navigationWrapClass}>
                <ul className="flex flex-col gap-2 w-full overflow-hidden ">
                    <li>
                        <NavLink
                            to={`/${projectInfo.name.toLocaleLowerCase()}/all`}
                            className={({ isActive }) => navLinkClass(isActive)}
                        >
                            all
                        </NavLink>
                    </li>
                    {projectInfo.domain.map((label) => (
                        <li key={`${projectInfo.id}-${label}`}>
                            <NavLink
                                to={`/${projectInfo.name.toLocaleLowerCase()}/${label.toLowerCase()}`}
                                className={({ isActive }) =>
                                    navLinkClass(isActive)
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}

                    {isAddDomain ? (
                        <>
                            <input
                                className="rounded px-3 py-2 bg-neutral-300 "
                                type="text"
                                value={newDomain}
                                onChange={(e) => setNewDomain(e.target.value)}
                            />

                            <div className="flex gap-2 mt-auto justify-end">
                                <Button
                                    rounded
                                    secondary
                                    onClickFun={() => setIsAddDomain(false)}
                                >
                                    close
                                </Button>
                                <Button
                                    rounded
                                    success
                                    onClickFun={() => {
                                        handleAddDomain(newDomain);
                                        setIsAddDomain(false);
                                        setNewDomain("");
                                    }}
                                >
                                    add
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Button
                            rounded
                            primary
                            link
                            onClickFun={() => setIsAddDomain(true)}
                            addonStyle={"text-left"}
                        >
                            + add
                        </Button>
                    )}
                </ul>
            </div>
        </div>
    );
};
