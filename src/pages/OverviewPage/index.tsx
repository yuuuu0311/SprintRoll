import { useState } from "react";

// dependency
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// utilities
import { addProject, addCollectionsViaTemplate, addSprint } from "@/utilities";
import { useProject, useCollaborativeProject } from "@/utilities/hook";
import { useUser } from "@/utilities/store";
import { UserFace } from "@/interface";

// component
import { ProfileCard } from "./ProjectCard";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";
import { SwitchButton } from "@/pages/OverviewPage/SwitchButton";

export const OverviewPage = () => {
    const { uid, email } = useUser<UserFace>((state) => state);

    const { projectInfo } = useProject();

    const { collaborativeProject } = useCollaborativeProject();
    const [isAddProject, setIsAddProject] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [usingTemplate, setUsingTemplate] = useState(false);

    const handleAddProject = () => {
        usingTemplate
            ? (addProject({
                  domain: ["frontend", "backend", "data", "ios"],
                  name: projectName,
                  owner: uid as string,
                  ownerEmail: email as string,
              }),
              addSprint({
                  name: "sprint template",
                  description: "create an ticket and drop it in sprint cycle",
                  cycle: [
                      new Date(),
                      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                  ],
                  index: 0,
                  project: projectName,
              }),
              addCollectionsViaTemplate(projectName.toLowerCase()))
            : addProject({
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
        classNames(
            "grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5"
        )
    );

    return (
        <div className="flex flex-col gap-6 py-6 md:py-12 px-6 md:px-24 md:mt-0 overflow-auto w-full h-full">
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
                                <div className="flex flex-col gap-4 h-full">
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
                                    <label className="flex justify-between gap-2">
                                        <span>add with template</span>
                                        <SwitchButton
                                            usingTemplate={usingTemplate}
                                            changeHandler={() =>
                                                setUsingTemplate(
                                                    (prev) => !prev
                                                )
                                            }
                                        />
                                    </label>
                                    <div className="flex justify-end gap-2 mt-auto">
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
