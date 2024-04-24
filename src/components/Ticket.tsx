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
    debounce,
    updateDescription,
    updateTicketStatus,
} from "@/utilities";

const DialogSection: React.FC<{
    children: React.ReactNode;
    sectionTitle: string;
}> = ({ children, sectionTitle }) => {
    return (
        <div>
            <div className="capitalize text-md px-2 text-neutral-400 mb-2">
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

    return (
        <div className="rounded-md bg-neutral-100 flex justify-between items-center gap-4 p-4">
            <div className="flex flex-1 flex-col gap-1">
                <div className="capitalize flex justify-between items-baseline">
                    <span>{developerInfo.name} </span>
                    <span className="text-xs text-neutral-500">
                        {developerInfo.domain}
                    </span>
                </div>
                <div className="text-gray-500 text-sm ">
                    {developerInfo.email}
                </div>
            </div>

            <Button
                link
                success={!isInAssigned}
                danger={isInAssigned}
                addonStyle="text-md aspect-square p-0 w-6 grid place-items-center rounded-full"
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
                {isInAssigned ? "-" : "+"}
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
        maxWait: 300,
    });

    const [dialogActive, setDialogActive] = useState(false);

    const ticketsDomainClass = twMerge(
        classNames("p-2", {
            "bg-lime-500": ticketInfo.domain === "frontend",
            "bg-red-500": ticketInfo.domain === "backend",
            "bg-yellow-500": ticketInfo.domain === "data",
            "bg-blue-500": ticketInfo.domain === "ios",
        })
    );

    const ticketsStatusClass = twMerge(
        classNames("flex flex-col gap-2 bg-neutral-300 rounded-lg p-4", {
            "bg-lime-400": ticketInfo.status === "0",
            "bg-red-300": ticketInfo.status === "1",
            "bg-yellow-300": ticketInfo.status === "2",
        })
    );

    const ticketsStatusLabelClass = twMerge(
        classNames("text-neutral-400", {
            "text-lime-900": ticketInfo.status === "0",
            "text-red-900": ticketInfo.status === "1",
            "text-yellow-900": ticketInfo.status === "2",
        })
    );

    const handleDialogToggle = () => {
        console.log(ticketInfo);

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

    const handleTextAreaChange = debounce(
        (e: ChangeEvent<HTMLTextAreaElement>, ticketInfo: TicketFace) => {
            updateDescription(e.target.value, ticketInfo);
        },
        1000
    );

    const handleTicketChange = (e: ChangeEvent<HTMLSelectElement>) => {
        updateTicketStatus(e.target.value, ticketInfo);
    };

    const renderLabel = (labels: object) => {
        const labelArr = [];
        for (const key in labels) {
            labelArr.push(key);
        }

        return labelArr
            .sort((a, b) => a.length - b.length)
            .map((label) => (
                <div
                    key={label}
                    className="bg-lime-500/50 rounded-full px-2 text-sm"
                >
                    {label}
                </div>
            ));
    };

    return (
        <>
            {ticketInfo.ticketID !== undefined && (
                <Draggable
                    index={index}
                    draggableId={ticketInfo.ticketID}
                    isDragDisabled={dialogActive}
                >
                    {({ innerRef, draggableProps, dragHandleProps }) => (
                        <div
                            ref={innerRef}
                            className="rounded-md overflow-hidden"
                            {...draggableProps}
                            {...dragHandleProps}
                            onClick={handleDialogToggle}
                        >
                            <div className={ticketsDomainClass}></div>
                            <div className="bg-stone-100 hover:bg-neutral-300 transition flex flex-col gap-1 p-2">
                                <div className="">{ticketInfo.title}</div>
                                <div className="flex justify-end gap-2">
                                    {renderLabel(ticketInfo.label as object)}
                                </div>
                            </div>
                        </div>
                    )}
                </Draggable>
            )}
            {dialogActive && (
                <Dialog
                    handleDialogToggle={() => {
                        handleDialogToggle();
                        setAssignedDeveloper(undefined);
                    }}
                    title={ticketInfo.title as string}
                >
                    <div className="flex gap-2 flex-1 mb-3 items-start">
                        <div className="flex flex-col gap-4 flex-1">
                            <DialogSection sectionTitle="created date">
                                <div className="px-2 text-neutral-500">
                                    {new Date(
                                        ticketInfo.createdTime.seconds * 1000 +
                                            ticketInfo.createdTime.nanoseconds /
                                                1000000
                                    ).toLocaleDateString()}
                                </div>
                            </DialogSection>
                            <DialogSection sectionTitle="assigned developers">
                                <div className="flex gap-1 flex-wrap px-2">
                                    {ticketInfo.assignedDeveloper?.map(
                                        (developer, index) => (
                                            <div
                                                key={`${developer}-${index}`}
                                                className="capitalize rounded-full bg-lime-500 text-white w-fit py-1 px-3"
                                            >
                                                {developer}
                                            </div>
                                        )
                                    )}
                                </div>
                            </DialogSection>
                            <DialogSection sectionTitle="Description">
                                <textarea
                                    className="p-2 text-neutral-500 rounded appearance-none w-full resize-none bg-transparent focus:bg-neutral-300 outline-none transition "
                                    placeholder="add some description here"
                                    onChange={(e) => {
                                        handleTextAreaChange(e, ticketInfo);
                                    }}
                                    defaultValue={ticketInfo.description}
                                ></textarea>
                            </DialogSection>
                        </div>
                        <div className="w-1/3 flex flex-col gap-3">
                            <div className="flex flex-col gap-2 bg-neutral-300 rounded-lg p-4">
                                <div className="text-neutral-400">
                                    Search Developer
                                </div>
                                <input
                                    type="text"
                                    className="w-full py-2 px-4 rounded-md focus:outline-neutral-400"
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
                            <div className={ticketsStatusClass}>
                                <div className={ticketsStatusLabelClass}>
                                    Status
                                </div>
                                <select
                                    className="px-2 py-1 rounded-lg"
                                    onChange={(e) => handleTicketChange(e)}
                                    defaultValue={ticketInfo.status}
                                >
                                    <option
                                        value="undefined"
                                        defaultChecked
                                        disabled
                                        hidden
                                    >
                                        null
                                    </option>
                                    <option value="0">complete</option>
                                    <option value="1">reject</option>
                                    <option value="2">padding</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-auto justify-end">
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
                        <Button
                            rounded
                            secondary
                            onClickFun={() => {
                                handleDialogToggle();
                            }}
                        >
                            close
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};
