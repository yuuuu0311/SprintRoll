import React, { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";

// dependency
// import { twMerge } from "tailwind-merge";
// import classNames from "classnames";

// icon
import { MdOutlineDelete, MdPeople } from "react-icons/md";

// utilities
import { ProjectFace } from "@/interface";
import { deleteProject, searchViaEmail, debounce } from "@/utilities";

//components
import { Collaborators } from "./Collaborators";
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

//interface
import { UserFace } from "@/interface";

export const ProfileCard: React.FC<{
    projectInfo: ProjectFace;
    isCollaborative?: boolean;
}> = ({ projectInfo, isCollaborative }) => {
    // const titleClass = twMerge(classNames("text-3xl"));

    const [dialogActive, setDialogActive] = useState({
        delete: false,
        invite: false,
    });

    const [searchCollaborators, setSearchCollaborators] = useState<
        UserFace[] | undefined
    >([]);

    const handleDialogToggle = (
        type: keyof {
            delete: false;
            invite: false;
        }
    ) => {
        setSearchCollaborators(undefined);
        setDialogActive((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const handleDeleteProject = (projectInfo: ProjectFace) => {
        deleteProject(projectInfo);
    };

    const handleSearchCollaborators = debounce(
        async (e: ChangeEvent<HTMLInputElement>) => {
            const result = await searchViaEmail(e.target.value);
            setSearchCollaborators(result as UserFace[]);
        },
        500
    );

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
                    <div className="flex flex-col gap-4">
                        <Collaborators projectID={projectInfo.id} />
                        <hr className="border-b-2 border-b-solid border-b-neutral-300" />
                        <div className="flex flex-col text-neutral-600">
                            <input
                                type="text"
                                placeholder="search email to invite collaborators"
                                className="py-1 px-2 w-full rounded-md"
                                onChange={(e) => handleSearchCollaborators(e)}
                            />
                        </div>
                        <div>
                            {searchCollaborators?.length === 0 ? (
                                <div>user no found</div>
                            ) : (
                                searchCollaborators?.map((collaborator) => (
                                    <div
                                        key={collaborator.uid}
                                        className="flex gap-8 items-center py-2"
                                    >
                                        <div className="flex gap-2 items-center">
                                            <div>{collaborator.email}</div>
                                            {/* <div>{collaborator.uid}</div> */}
                                        </div>

                                        <div className="ml-auto bg-lime-500 text-white rounded-full cursor-pointer hover:bg-lime-600 transition flex items-center justify-center w-6 h-6">
                                            +
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <Button
                            secondary
                            rounded
                            onClickFun={() => handleDialogToggle("invite")}
                        >
                            close
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};
