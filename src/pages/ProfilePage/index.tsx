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

export const ProfilePage = () => {
    const titleClass = twMerge(classNames("text-3xl"));
    const { uid } = useUser<UserFace>((state) => state);
    const { projectInfo } = useProject();
    const { collaborativeProject } = useCollaborativeProject();
    const [isAddProject, setIsAddProject] = useState(false);
    const [projectName, setProjectName] = useState("");

    const handleAddProject = () => {
        addProject({
            domain: [],
            name: projectName,
            owner: uid as string,
        });
    };

    return (
        <div className="flex gap-4">
            <div></div>
            <div className="flex flex-col gap-6 p-8 mx-auto">
                <h3>ProfilePage</h3>
                <div className="flex flex-col gap-4">
                    <h3 className={titleClass}>owned project</h3>
                    <div className="flex flex-wrap gap-3">
                        {projectInfo.map((project) => (
                            <ProfileCard
                                key={project.id}
                                projectInfo={project}
                            />
                        ))}

                        <div className="bg-neutral-200 w-48 h-48 rounded p-5 flex flex-col">
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
                                    onClick={() =>
                                        setIsAddProject((prev) => !prev)
                                    }
                                >
                                    + add project
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className={titleClass}>collaborative project</h3>
                    <div className="flex flex-wrap gap-3">
                        {collaborativeProject?.map((project) => (
                            <ProfileCard
                                key={project.id}
                                projectInfo={project}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
