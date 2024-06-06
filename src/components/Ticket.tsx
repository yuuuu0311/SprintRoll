import { useEffect, useState } from "react";

// dependency
import { Draggable } from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// interface
import { TicketFace, LabelInputFace, LabelFace } from "@/interface";

// components
import { TicketInfo } from "@/components/TicketInfo";
import { renderLabel } from "@/components/Label";

// utilities
import { updateTicketInfo, deleteTicket } from "@/utilities";

// icon
import { MdModeEdit, MdCheck } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

export const Label: React.FC<LabelInputFace> = ({
    ticketInfo,
    labelName,
    isCheck,
    changeHandler,
}) => {
    const labelClass = twMerge(
        classNames(
            "bg-lime-500/50 rounded-full px-2 leading-none bg-neutral-300 py-1 px-3 transition",
            {
                "[&:has(input:checked)]:bg-yellow-400/50 [&:has(input:checked)]:text-yellow-700 ":
                    labelName === "bug",
                "[&:has(input:checked)]:bg-blue-400/50 [&:has(input:checked)]:text-blue-700":
                    labelName === "feature",
                "[&:has(input:checked)]:bg-lime-400/50 [&:has(input:checked)]:text-lime-700":
                    labelName === "refactor",
                "[&:has(input:checked)]:bg-rose-400/50 [&:has(input:checked)]:text-rose-700":
                    labelName === "ASAP",
            }
        )
    );

    return (
        <label htmlFor={labelName} className={labelClass}>
            <span>{labelName}</span>
            <input
                type="checkbox"
                name={labelName}
                id={labelName}
                hidden
                defaultChecked={isCheck?.[labelName]}
                onChange={(e) => {
                    if (changeHandler === undefined) return;
                    changeHandler((prev) => {
                        updateTicketInfo(ticketInfo, {
                            target: "label",
                            value: {
                                ...prev,
                                [e.target.name]: e.target.checked,
                            },
                        });

                        return {
                            ...prev,
                            [e.target.name]: e.target.checked,
                        };
                    });
                }}
            />
        </label>
    );
};

export const Ticket: React.FC<{
    ticketInfo: TicketFace;
    index: number;
    isInCollection?: string;
    isDragging?: boolean;
}> = ({ isInCollection, index, ticketInfo, isDragging }) => {
    const [dialogActive, setDialogActive] = useState(false);
    const [newTicketTitle, setNewTicketTitle] = useState({
        isEdit: false,
        value: ticketInfo.title,
    });

    const ticketsClass = twMerge(
        classNames("rounded-md transition group relative overflow-hidden", {
            "drop-shadow-xl": isDragging,
        })
    );
    const ticketsDomainClass = twMerge(
        classNames("px-2 py-1 flex justify-end group bg-purple-300", {
            "bg-lime-500": ticketInfo.domain === "frontend",
            "bg-red-500": ticketInfo.domain === "backend",
            "bg-yellow-500": ticketInfo.domain === "data",
            "bg-blue-500": ticketInfo.domain === "ios",
        })
    );

    const handleDialogToggle = () => {
        setDialogActive((prev) => (prev ? false : true));
    };

    const needRenderLabel = (labels: LabelFace) => {
        const labelArr = [];

        for (const key in labels) {
            const labelCheck = labels[key as keyof LabelFace];
            if (labelCheck) labelArr.push(key);
        }

        return labelArr.length;
    };

    const getDraggingStyle = (isDragging: boolean) => {
        const classes = twMerge(classNames({ "shadow-lg": isDragging }));
        return classes;
    };

    const handleNewTicketTitle = () => {
        setNewTicketTitle((prev) => ({
            ...prev,
            isEdit: false,
        }));
        updateTicketInfo(ticketInfo, {
            target: "title",
            value: newTicketTitle.value as string,
        });
    };

    useEffect(() => {
        console.log(ticketInfo);
    }, [ticketInfo]);

    return (
        <>
            {ticketInfo.ticketID !== undefined && (
                <Draggable
                    index={index}
                    draggableId={
                        `collections/${ticketInfo.collectionID}/tickets/${ticketInfo.ticketID}` as string
                    }
                    isDragDisabled={dialogActive}
                >
                    {(
                        { innerRef, draggableProps, dragHandleProps },
                        { isDragging }
                    ) => (
                        <div
                            ref={innerRef}
                            {...draggableProps}
                            {...dragHandleProps}
                            className={getDraggingStyle(isDragging)}
                        >
                            <div
                                className={ticketsClass}
                                onClick={handleDialogToggle}
                            >
                                <div className={ticketsDomainClass}>
                                    <TiDelete
                                        className="opacity-0 group-hover:opacity-100 transition hover:text-rose-600 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteTicket(
                                                isInCollection as string,
                                                ticketInfo.ticketID as string,
                                                index as number
                                            );
                                        }}
                                    />
                                </div>
                                <div className="bg-stone-100 hover:bg-neutral-300 transition relative flex flex-col gap-1 p-2">
                                    <div className="flex gap-1 justify-between">
                                        {!newTicketTitle.isEdit ? (
                                            <div className="flex gap-2 w-full">
                                                <div className="line-clamp-1 flex-1 text-ellipsis break-words">
                                                    {ticketInfo.title}
                                                </div>
                                                <span className="cursor-pointer transition group-hover:opacity-100 opacity-0 flex items-center">
                                                    <MdModeEdit
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setNewTicketTitle(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    isEdit: true,
                                                                })
                                                            );
                                                        }}
                                                    />
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="flex-1 line-clamp-1">
                                                    <span>
                                                        <input
                                                            type="text"
                                                            name="newTicketTitle"
                                                            id="newTicketTitle"
                                                            className="bg-transparent outline-none"
                                                            autoFocus={true}
                                                            value={
                                                                newTicketTitle.value
                                                            }
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                            onBlur={() =>
                                                                handleNewTicketTitle
                                                            }
                                                            onChange={(e) => {
                                                                setNewTicketTitle(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        value: e
                                                                            .target
                                                                            .value,
                                                                    })
                                                                );
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (
                                                                    e.key ===
                                                                    "Enter"
                                                                )
                                                                    handleNewTicketTitle();
                                                            }}
                                                        />
                                                    </span>
                                                </span>
                                                <span>
                                                    <MdCheck
                                                        className="cursor-pointer hover:text-lime-600"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleNewTicketTitle();
                                                        }}
                                                    />
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    {needRenderLabel(
                                        ticketInfo.label as LabelFace
                                    ) > 0 ? (
                                        <div className="flex flex-wrap justify-end gap-2 ">
                                            {renderLabel(
                                                ticketInfo.label as object
                                            )}
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </Draggable>
            )}
            {dialogActive && (
                <TicketInfo
                    ticketInfo={ticketInfo}
                    index={index}
                    isInCollection={isInCollection}
                    setDialogActive={setDialogActive}
                />
            )}
        </>
    );
};
