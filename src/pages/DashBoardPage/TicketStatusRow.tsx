import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { Draggable } from "react-beautiful-dnd";
// icons

import { TicketFace } from "@/interface";

export const TicketStatusRow: React.FC<{
    ticketInfo: TicketFace;
    index: number;
}> = ({ ticketInfo, index }) => {
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
                    className="bg-neutral-400/50 grid place-items-center text-neutral-700 rounded-full px-2 text-sm"
                >
                    {label}
                </div>
            ));
    };

    // style
    const ticketStatusLight = twMerge(
        classNames(
            "aspect-square bg-neutral-300 rounded-full w-3 h-3 transition",
            {
                "bg-lime-400": ticketInfo.status === "0",
                "bg-red-400": ticketInfo.status === "1",
                "bg-yellow-300": ticketInfo.status === "2",
            }
        )
    );

    return (
        <Draggable index={index} draggableId={ticketInfo.ticketID as string}>
            {({ innerRef, draggableProps, dragHandleProps }) => (
                <div ref={innerRef} {...draggableProps} {...dragHandleProps}>
                    <div className="flex justify-between bg-stone-100 hover:pl-5 p-2 hover:bg-stone-200/80 transition-all rounded-full">
                        <div className="flex gap-4 items-center">
                            <span className={ticketStatusLight}></span>
                            <span>{ticketInfo.title}</span>
                        </div>
                        <div className="flex justify-end gap-2">
                            {renderLabel(ticketInfo.label as object)}
                            <div className="bg-neutral-400/50 grid place-items-center text-neutral-700 rounded-full px-2 text-sm">
                                {ticketInfo.domain}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};
