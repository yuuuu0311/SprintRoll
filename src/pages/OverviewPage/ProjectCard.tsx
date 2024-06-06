import React, { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";

// icon
import { MdOutlineDelete, MdOutlinePeopleOutline } from "react-icons/md";

// utilities
import { ProjectFace } from "@/interface";
import {
    deleteProject,
    searchViaEmail,
    addCollaborator,
    debounce,
} from "@/utilities";
import { deleteAllCollection, deleteAllSprints } from "@/utilities";
import { useCollaborators } from "@/utilities/hook";

//components
import { Collaborators } from "./Collaborators";
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog/";

//interface
import { UserFace } from "@/interface";

export const ProfileCard: React.FC<{
    projectInfo: ProjectFace;
    isCollaborative?: boolean;
}> = ({ projectInfo, isCollaborative }) => {
    const [dialogActive, setDialogActive] = useState({
        delete: false,
        invite: false,
    });

    const { collaborators } = useCollaborators(projectInfo.id);
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
        deleteAllSprints(projectInfo);
        deleteAllCollection(projectInfo);
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
            <div className="cursor-pointer flex-1 hover:bg-neutral-200 transition bg-stone-100 w-full h-auto aspect-square rounded-md overflow-hidden p-5 flex flex-col gap-2 shadow-lg">
                <NavLink
                    to={`/${projectInfo.name}/all`}
                    className="text-xl flex-1 line-clamp-1"
                >
                    <span className="text-xl line-clamp-2 break-words">
                        {projectInfo.name}
                    </span>
                </NavLink>

                {isCollaborative ? (
                    <span>project owner : {projectInfo.ownerEmail}</span>
                ) : (
                    <div className="mt-auto justify-end flex gap-2 h-[20px]">
                        <div
                            className="flex items-end leading-none gap-1 hover:text-blue-500 text-neutral-500"
                            onClick={() => handleDialogToggle("invite")}
                        >
                            <span className=" text-xs">
                                {collaborators?.length}
                            </span>
                            <MdOutlinePeopleOutline className=" transition text-xl cursor-pointer" />
                        </div>

                        <div>
                            <MdOutlineDelete
                                className="hover:text-rose-500 transition text-xl cursor-pointer text-neutral-500"
                                onClick={() => handleDialogToggle("delete")}
                            />
                        </div>
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
                            rounded
                            secondary
                            onClickFun={() => handleDialogToggle("delete")}
                        >
                            Close
                        </Button>
                        <Button
                            danger
                            rounded
                            onClickFun={() => handleDeleteProject(projectInfo)}
                        >
                            delete
                        </Button>
                    </div>
                </Dialog>
            )}
            {dialogActive.invite && (
                <Dialog
                    size="md"
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
                                        </div>

                                        <div
                                            className="ml-auto bg-lime-500 text-white rounded-full cursor-pointer hover:bg-lime-600 transition flex items-center justify-center w-6 h-6"
                                            onClick={() => {
                                                addCollaborator(
                                                    projectInfo.id,
                                                    collaborator.uid as string,
                                                    {
                                                        name: collaborator.uid as string,
                                                        role: 1,
                                                        email: collaborator.email as string,
                                                    }
                                                );
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6 ">
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
