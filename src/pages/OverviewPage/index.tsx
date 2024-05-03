import { useState } from "react";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// utilities
import { addProject } from "@/utilities";
import { useProject, useCollaborativeProject } from "@/utilities/hook";
import { useUser } from "@/utilities/store";
import { UserFace } from "@/interface";

// component
import { ProfileCard } from "./ProjectCard";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";

export const OverviewPage = () => {
    const { uid, email } = useUser<UserFace>((state) => state);

    const { projectInfo } = useProject();

    const { collaborativeProject } = useCollaborativeProject();
    const [isAddProject, setIsAddProject] = useState(false);
    const [projectName, setProjectName] = useState("");

    const handleAddProject = () => {
        addProject({
            domain: [],
            name: projectName,
            owner: uid as string,
            ownerEmail: email as string,
        });
    };

    const titleClass = twMerge(
        classNames(
            "md:text-3xl text-xl capitalize tracking-wide text-neutral-500"
        )
    );
    const cardWrapClass = twMerge(
        classNames("grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5")
    );

    return (
        <div className="flex flex-col gap-6 py-6 md:py-12 px-6 md:px-24 flex-1">
            <div className="flex flex-col gap-4 flex-1">
                <h3 className={titleClass}>owned project</h3>
                {projectInfo === undefined ? (
                    <Loader />
                ) : (
                    <div className={cardWrapClass}>
                        {projectInfo?.map((project) => (
                            <ProfileCard
                                key={project.id}
                                projectInfo={project}
                            />
                        ))}
                        <div className="bg-neutral-200 rounded-md p-5 flex flex-col hover:bg-neutral-400/50 transition w-full h-auto aspect-square shadow-lg">
                            {isAddProject ? (
                                <div className="flex flex-col gap-4">
                                    <input
                                        className="w-full rounded px-2 py-1"
                                        type="text"
                                        autoFocus
                                        placeholder="Project title"
                                        value={projectName}
                                        onChange={(e) =>
                                            setProjectName(e.target.value)
                                        }
                                    />
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            rounded
                                            secondary
                                            onClickFun={() =>
                                                setIsAddProject((prev) => !prev)
                                            }
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            success
                                            rounded
                                            onClickFun={() => {
                                                if (projectName.length <= 0)
                                                    return;
                                                setProjectName("");
                                                setIsAddProject(
                                                    (prev) => !prev
                                                );
                                                handleAddProject();
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <span
                                    className="inline-block w-full h-full cursor-pointer"
                                    onClick={() =>
                                        setIsAddProject((prev) => !prev)
                                    }
                                >
                                    + add project
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-4 flex-1">
                <h3 className={titleClass}>collaborative project</h3>
                {collaborativeProject === undefined ? (
                    <Loader />
                ) : (
                    <div className={cardWrapClass}>
                        {collaborativeProject?.map((project) => (
                            <ProfileCard
                                isCollaborative
                                key={project.id}
                                projectInfo={project}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
