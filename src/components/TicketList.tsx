// dependency
import { Droppable, Draggable } from "react-beautiful-dnd";

import { Dispatch, SetStateAction } from "react";

import { CollectionFace } from "@/interface";

export const TicketList: React.FC<{
    collectionInfo: CollectionFace;
    index: number;
    setCollection: Dispatch<SetStateAction<CollectionFace[]>>;
    children: React.ReactNode;
}> = ({ collectionInfo, index, children, setCollection }) => {
    const handleAddTicket = () => {
        setCollection((prev) => {
            const collectionsCopy = [...prev];
            const collectionInfoCopy = {
                ...collectionInfo,
                tickets: [
                    ...collectionInfo.tickets,
                    {
                        id: collectionInfo.tickets.length + 1,
                        name: `item${collectionInfo.tickets.length + 1}`,
                    },
                ],
            };

            collectionsCopy.splice(collectionInfo.id, 1, collectionInfoCopy);

            return collectionsCopy;
        });

        // setCollection();
    };

    return (
        <Draggable
            draggableId={`collection-${collectionInfo.id}`}
            index={collectionInfo.id}
        >
            {({ innerRef, draggableProps, dragHandleProps }) => (
                <div ref={innerRef} {...draggableProps} {...dragHandleProps}>
                    <Droppable droppableId={collectionInfo.id.toString()}>
                        {({ innerRef, droppableProps, placeholder }) => (
                            <div
                                className="flex flex-col"
                                ref={innerRef}
                                {...droppableProps}
                                {...dragHandleProps}
                            >
                                <h3 className="mb-3">{collectionInfo.name}</h3>

                                <div className="border-2 border-solid border-white w-48">
                                    <div>{children}</div>
                                    {placeholder}
                                </div>

                                <button
                                    type="button"
                                    // onClick={() => handleAddTicket(cateInfo.id)}
                                    onClick={handleAddTicket}
                                >
                                    + add ticket
                                </button>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};
