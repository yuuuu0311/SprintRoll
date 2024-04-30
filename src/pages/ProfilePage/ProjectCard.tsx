import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// dependency
// import { twMerge } from "tailwind-merge";
// import classNames from "classnames";

// icon
import { MdOutlineDelete, MdPeople } from "react-icons/md";

// utilities
import { ProjectFace } from "@/interface";
import { deleteProject } from "@/utilities";

//components
import { Collaborators } from "./Collaborators";
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

export const ProfileCard: React.FC<{
    projectInfo: ProjectFace;
    isCollaborative?: boolean;
}> = ({ projectInfo, isCollaborative }) => {
    // const titleClass = twMerge(classNames("text-3xl"));

    const [dialogActive, setDialogActive] = useState({
        delete: false,
        invite: false,
    });

    const handleDialogToggle = (
        type: keyof {
            delete: false;
            invite: false;
        }
    ) => {
        setDialogActive((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const handleDeleteProject = (projectInfo: ProjectFace) => {
        deleteProject(projectInfo);
    };

    return (
        <>
            <div className="cursor-pointer flex-1 hover:bg-blue-200 transition bg-stone-100 w-48 h-48 rounded p-5 flex flex-col gap-2">
                <NavLink
                    to={`/${projectInfo.name}/all`}
                    className="flex-1 text-xl"
                >
                    {projectInfo.name}
                </NavLink>

                {isCollaborative ? (
                    <span>owner : {projectInfo.owner}</span>
                ) : (
                    <div className="mt-auto justify-end flex gap-2 items-center">
                        <MdPeople
                            className="hover:text-blue-500 transition text-xl cursor-pointer text-neutral-500"
                            onClick={() => handleDialogToggle("invite")}
                        />
                        <MdOutlineDelete
                            className="hover:text-rose-500 transition text-xl cursor-pointer text-neutral-500"
                            onClick={() => handleDialogToggle("delete")}
                        />
                    </div>
                )}
            </div>

            {dialogActive.delete && (
                <Dialog
                    handleDialogToggle={() => handleDialogToggle("delete")}
                    danger
                    title="caution"
                >
                    <div className="flex flex-col mb-6 text-neutral-600">
                        <div className="text-lg">
                            Are you sure you want to delete this project ?
                        </div>
                        <div>This action can not be undone</div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            danger
                            rounded
                            onClickFun={() => handleDeleteProject(projectInfo)}
                        >
                            delete
                        </Button>
                        <Button
                            rounded
                            secondary
                            onClickFun={() => handleDialogToggle("delete")}
                        >
                            Close
                        </Button>
                    </div>
                </Dialog>
            )}
            {dialogActive.invite && (
                <Dialog
                    handleDialogToggle={() => handleDialogToggle("invite")}
                    title="collaborators"
                >
                    <div>
                        <Collaborators projectID={projectInfo.id} />
                    </div>

                    <div className="flex flex-col mb-6 text-neutral-600">
                        invite
                        <input
                            type="text"
                            placeholder="email"
                            className="py-1 px-2 w-full"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            secondary
                            rounded
                            onClickFun={() => handleDialogToggle("invite")}
                        >
                            close
                        </Button>
                        <Button
                            rounded
                            success
                            onClickFun={() => handleDialogToggle("invite")}
                        >
                            invite
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};
