import { LegacyRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import { TicketFace } from "@/interface";

import { TicketInfo } from "@/components/TicketInfo";
import { renderLabel } from "@/components/Label";

export const TicketStatusRow: React.FC<{
    ticketInfo: TicketFace;
    innerRef: LegacyRef<HTMLDivElement>;
    draggableProps: unknown;
    dragHandleProps: unknown;
    isDragging: unknown;
    index: number;
}> = ({
    ticketInfo,
    innerRef,
    draggableProps,
    dragHandleProps,
    isDragging,
    index,
}) => {
    const [dialogActive, setDialogActive] = useState(false);

    // style
    const ticketRowClass = twMerge(
        classNames(
            "flex flex-wrap gap-2 justify-between bg-stone-100 hover:px-5 p-2 hover:bg-stone-200/80 transition-all rounded-full relative items-center",
            {
                "z-50 shadow-lg w-full !absolute !top-0 !left-0": isDragging,
            }
        )
    );

    const ticketStatusLightBg = twMerge(
        classNames(
            "absolute inline-flex h-full w-full rounded-full bg-neutral-400/50 opacity-75",
            {
                "animate-ping": ticketInfo.status === -1,
                "bg-lime-400": ticketInfo.status === "0",
                "bg-red-400": ticketInfo.status === "1",
                "bg-yellow-300": ticketInfo.status === "2",
            }
        )
    );
    const ticketStatusLight = twMerge(
        classNames(
            "relative inline-flex rounded-full h-3 w-3 bg-neutral-400/50",
            {
                "bg-lime-400": ticketInfo.status === "0",
                "bg-red-400": ticketInfo.status === "1",
                "bg-yellow-300": ticketInfo.status === "2",
            }
        )
    );
    const ticketStatusLabel = twMerge(
        classNames(
            "bg-neutral-400/50 grid place-items-center text-neutral-700 rounded-full px-2 text-sm",
            {
                "bg-lime-400/50 text-lime-700": ticketInfo.status === "0",
                "bg-red-400/50 text-red-700": ticketInfo.status === "1",
                "bg-yellow-300/50 text-yellow-700": ticketInfo.status === "2",
            }
        )
    );

    const getStatusLabel = (statusCode: number | string | undefined) => {
        if (statusCode === undefined) return;

        switch (statusCode) {
            case -1:
                return "unfinished";
                break;

            case "0":
                return "completed";
                break;
            case "1":
                return "rejected";
                break;
            case "2":
                return "pending";
                break;

            default:
                break;
        }
    };

    return (
        <>
            <div
                ref={innerRef as LegacyRef<HTMLDivElement>}
                {...(draggableProps as object)}
                {...(dragHandleProps as object)}
                onClick={() => {
                    setDialogActive((prev) => !prev);
                }}
                className="w-full"
            >
                <div className={ticketRowClass}>
                    <div className="flex gap-4 items-center flex-1">
                        <span className="relative flex h-3 w-3">
                            <span className={ticketStatusLightBg}></span>
                            <span className={ticketStatusLight}></span>
                        </span>

                        <span className="flex-1 line-clamp-1">
                            {ticketInfo.title}
                        </span>
                    </div>
                    <div className="flex justify-end gap-2">
                        <div className={ticketStatusLabel}>
                            {getStatusLabel(ticketInfo.status)}
                        </div>
                        {renderLabel(ticketInfo.label as object)}
                        <div className="bg-neutral-300/50 grid place-items-center text-neutral-700 rounded-full px-2 text-sm">
                            {ticketInfo.domain}
                        </div>
                    </div>
                </div>
            </div>

            {dialogActive && (
                <TicketInfo
                    ticketInfo={ticketInfo}
                    index={index}
                    isInCollection={ticketInfo.collectionID}
                    setDialogActive={setDialogActive}
                />
            )}
        </>
    );
};
