import { Draggable } from "react-beautiful-dnd";

import { TicketFace } from "@/interface";

type TicketProps = {
    itemInfo: TicketFace;
    index: number;
};

export const Ticket: React.FC<TicketProps> = ({ itemInfo, index }) => {
    // console.log(index);

    return (
        <Draggable
            key={itemInfo.id}
            index={index}
            draggableId={itemInfo.id.toString()}
        >
            {({ innerRef, draggableProps, dragHandleProps }) => (
                <div
                    ref={innerRef}
                    className="flex flex-col bg-gray-700 border-2 border-dashed border-white"
                    style={{
                        ...draggableProps.style,
                        display: "block",
                        margin: "0 8px 8px",
                        userSelect: "none",
                    }}
                    {...draggableProps}
                    {...dragHandleProps}
                >
                    <h3 className="font-bold">filter index : {index}</h3>
                    <h3 className="font-bold">
                        real index : {itemInfo.id - 1}
                    </h3>
                    <div>{itemInfo.name}</div>
                </div>
            )}
        </Draggable>
    );
};
