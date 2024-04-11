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
            draggableId={itemInfo.id.toString()}
            index={index}
        >
            {({ innerRef, draggableProps, dragHandleProps }) => (
                <div
                    ref={innerRef}
                    className="flex flex-col bg-red-500 border-2 border-dashed border-white"
                    style={{
                        ...draggableProps.style,
                        display: "block",
                        margin: "0 8px 8px",
                        userSelect: "none",
                    }}
                    {...draggableProps}
                    {...dragHandleProps}
                >
                    <h3 className="font-bold">arr index : {index}</h3>
                    <h3 className="font-bold">
                        itemInfo.id : {itemInfo.id - 1}
                    </h3>
                    <div>{itemInfo.name}</div>
                </div>
            )}
        </Draggable>
    );
};
