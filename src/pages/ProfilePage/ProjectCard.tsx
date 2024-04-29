import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// dependency
// import { twMerge } from "tailwind-merge";
// import classNames from "classnames";

// icon
import { MdOutlineDelete } from "react-icons/md";

// utilities
import { ProjectFace } from "@/interface";
import { deleteProject } from "@/utilities";

//components
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

export const ProfileCard: React.FC<{ projectInfo: ProjectFace }> = ({
    projectInfo,
}) => {
    // const titleClass = twMerge(classNames("text-3xl"));

    const [dialogActive, setDialogActive] = useState(false);

    const handleDialogToggle = () => {
        setDialogActive((prev) => (prev ? false : true));
    };

    const handleDeleteProject = (projectInfo: ProjectFace) => {
        deleteProject(projectInfo);
    };

    return (
        <>
            <div className="cursor-pointer flex-1 hover:bg-blue-200 transition bg-stone-100 w-48 h-48 rounded p-5 flex flex-col gap-2">
                <NavLink to={`/${projectInfo.name}/all`} className="flex-1">
                    {projectInfo.name}
                </NavLink>

                <div className="mt-auto text-right flex gap-2 items-center">
                    <span>+</span>
                    <MdOutlineDelete
                        className="hover:text-rose-500 transition text-xl cursor-pointer text-neutral-500"
                        onClick={handleDialogToggle}
                    />
                </div>
            </div>

            {dialogActive && (
                <Dialog
                    handleDialogToggle={handleDialogToggle}
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
                            onClickFun={handleDialogToggle}
                        >
                            Close
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};
