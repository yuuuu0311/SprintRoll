// dependency
import { Droppable, Draggable } from "react-beautiful-dnd";

interface TicketListProps {
    cateInfo: {
        id: number;
        name: string;
    };
    index: number;
    children: React.ReactNode;
}

export const TicketList: React.FC<TicketListProps> = ({
    cateInfo,
    index,
    children,
}) => {
    return (
        <Draggable
            draggableId={`category-${cateInfo.id}`}
            key={`category-${cateInfo.id}`}
            index={index}
        >
            {({ innerRef, draggableProps, dragHandleProps }) => (
                <div
                    ref={innerRef}
                    style={{
                        ...draggableProps.style,
                    }}
                    {...draggableProps}
                    {...dragHandleProps}
                >
                    <Droppable droppableId={cateInfo.id.toString()}>
                        {({ innerRef, droppableProps, placeholder }) => (
                            <div
                                className="flex flex-col"
                                ref={innerRef}
                                {...droppableProps}
                            >
                                <h3 className="mb-3">{cateInfo.name}</h3>

                                <div className="border-2 border-solid border-white w-48">
                                    <div>{children}</div>
                                    {placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};
