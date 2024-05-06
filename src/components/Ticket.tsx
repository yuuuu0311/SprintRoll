import { useState } from "react";

// dependency
import { Draggable } from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// interface
import { TicketFace, LabelInputFace } from "@/interface";

// components

import { TicketInfo } from "@/components/TicketInfo";
import { renderLabel } from "@/components/Label";

// utilities
import { updateTicketInfo } from "@/utilities";

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

    const ticketsClass = twMerge(
        classNames("rounded-md overflow-hidden transition", {
            "drop-shadow-xl": isDragging,
        })
    );
    const ticketsDomainClass = twMerge(
        classNames({
            "p-2 bg-lime-500": ticketInfo.domain === "frontend",
            "p-2 bg-red-500": ticketInfo.domain === "backend",
            "p-2 bg-yellow-500": ticketInfo.domain === "data",
            "p-2 bg-blue-500": ticketInfo.domain === "ios",
        })
    );

    const handleDialogToggle = () => {
        setDialogActive((prev) => (prev ? false : true));
    };

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
                    {({ innerRef, draggableProps, dragHandleProps }) => (
                        <div
                            ref={innerRef}
                            {...draggableProps}
                            {...dragHandleProps}
                        >
                            <div
                                className={ticketsClass}
                                onClick={handleDialogToggle}
                            >
                                <div className={ticketsDomainClass}></div>
                                <div className="bg-stone-100 hover:bg-neutral-300 transition flex flex-col gap-1 p-2">
                                    <div className="">{ticketInfo.title}</div>
                                    <div className="flex flex-wrap justify-end gap-2 ">
                                        {renderLabel(
                                            ticketInfo.label as object
                                        )}
                                    </div>
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
