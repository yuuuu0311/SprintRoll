import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";

// dependency
import { Draggable } from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { useDebounce } from "use-debounce";
// interface
import { TicketFace, UserFace } from "@/interface";

// components
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

// utilities
import {
    deleteTicket,
    getDomainDeveloper,
    assignDeveloper,
    removeFromAssigned,
} from "@/utilities";

const DialogSection: React.FC<{
    children: React.ReactNode;
    sectionTitle: string;
}> = ({ children, sectionTitle }) => {
    return (
        <div>
            <div className="capitalize text-lg font-bold text-neutral-500 mb-1">
                {sectionTitle}
            </div>
            <div>{children}</div>
        </div>
    );
};

const Developer: React.FC<{
    developerInfo: UserFace;
    isInCollection: string;
    ticketInfo: TicketFace;
}> = ({ developerInfo, isInCollection, ticketInfo }) => {
    const assignedDeveloperArr = [
        ...(ticketInfo.assignedDeveloper as string[]),
    ];
    const isInAssigned =
        assignedDeveloperArr.indexOf(developerInfo.name) !== -1;

    const btnClass = twMerge(
        classNames("text-sm py-1 px-3", {
            "bg-orange-300": isInAssigned,
        })
    );

    return (
        <div className="rounded-md bg-neutral-100 flex gap-2 p-4">
            <div className="flex flex-1 flex-col gap-1">
                <div className="capitalize">{developerInfo.name}</div>
                <div className="text-gray-500 text-sm normal-case">
                    {developerInfo.email}
                </div>
                <div className="capitalize text-gray-500 text-sm">
                    {developerInfo.domain}
                </div>
            </div>

            <Button
                rounded
                addonStyle={btnClass}
                onClickFun={() =>
                    isInAssigned
                        ? removeFromAssigned(
                              developerInfo,
                              isInCollection,
                              ticketInfo.ticketID as string
                          )
                        : assignDeveloper(
                              developerInfo,
                              isInCollection,
                              ticketInfo.ticketID as string
                          )
                }
            >
                {isInAssigned ? "assigned" : "assign"}
            </Button>
        </div>
    );
};

export const Ticket: React.FC<{
    ticketInfo: TicketFace;
    index: number;
    isInCollection?: string;
}> = ({ isInCollection, index, ticketInfo }) => {
    const { domain } = useParams();

    const [assignedDeveloper, setAssignedDeveloper] = useState<
        UserFace[] | void
    >();
    const [searchDeveloper, setSearchDeveloper] = useState<string>();
    const [searchValue] = useDebounce(searchDeveloper, 1000, {
        leading: true,
        maxWait: 1000,
    });

    const [dialogActive, setDialogActive] = useState(false);

    const ticketsDomainClass = twMerge(
        classNames("p-3", {
            "bg-lime-500": ticketInfo.domain === "frontend",
            "bg-red-500": ticketInfo.domain === "backend",
            "bg-yellow-500": ticketInfo.domain === "data",
            "bg-blue-500": ticketInfo.domain === "ios",
        })
    );
    const ticketsClass = classNames(
        twMerge("bg-neutral-400  hover:bg-neutral-300 transition p-2")
    );

    const handleDialogToggle = () => {
        setDialogActive((prev) => (prev ? false : true));
    };

    const handelSearchDeveloper = async (e: ChangeEvent<HTMLInputElement>) => {
        setSearchDeveloper(e.target.value);

        if (e.target.value.length === 0) {
            setAssignedDeveloper([]);
        } else {
            const developerInfo = await getDomainDeveloper(
                domain as string,
                searchValue as string
            );
            setAssignedDeveloper(developerInfo);
        }
    };

    return (
        <>
            {ticketInfo.ticketID !== undefined && (
                <Draggable index={index} draggableId={ticketInfo.ticketID}>
                    {({ innerRef, draggableProps, dragHandleProps }) => (
                        <div
                            ref={innerRef}
                            className="rounded-md overflow-hidden"
                            {...draggableProps}
                            {...dragHandleProps}
                            onClick={handleDialogToggle}
                        >
                            <div className={ticketsDomainClass}></div>
                            <div className={ticketsClass}>
                                {ticketInfo.title} - {ticketInfo.order}
                            </div>
                        </div>
                    )}
                </Draggable>
            )}
            {dialogActive && (
                <Dialog
                    handleDialogToggle={handleDialogToggle}
                    title={ticketInfo.title as string}
                >
                    <div className="mb-4 flex flex-col gap-2">
                        {/* <div>collectionID : {isInCollection}</div>
                        <div>ticketID : {ticketInfo.ticketID}</div> */}

                        <DialogSection sectionTitle="Description">
                            {ticketInfo.description?.length === 0 ? (
                                <div className="text-neutral-500">
                                    add some description here
                                </div>
                            ) : (
                                <div className="bg-neutral-300 rounded p-4">
                                    {ticketInfo.description}
                                </div>
                            )}
                        </DialogSection>
                        <DialogSection sectionTitle="assign developer">
                            <div className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    className="w-full py-2 px-4 rounded-md focus:bg-neutral-300"
                                    onChange={(e) => handelSearchDeveloper(e)}
                                />
                                <div className="flex flex-col gap-2">
                                    {assignedDeveloper?.length === 0 ? (
                                        <div>Developer not found</div>
                                    ) : (
                                        assignedDeveloper?.map(
                                            (developerInfo) => (
                                                <Developer
                                                    key={developerInfo.uid}
                                                    isInCollection={
                                                        isInCollection as string
                                                    }
                                                    ticketInfo={ticketInfo}
                                                    developerInfo={
                                                        developerInfo
                                                    }
                                                />
                                            )
                                        )
                                    )}
                                </div>
                            </div>
                        </DialogSection>
                    </div>
                    <Button
                        rounded
                        danger
                        onClickFun={() => {
                            deleteTicket(
                                isInCollection as string,
                                ticketInfo.ticketID as string,
                                index as number
                            );
                        }}
                    >
                        delete
                    </Button>
                </Dialog>
            )}
        </>
    );
};
