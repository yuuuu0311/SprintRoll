// dependency
import { Droppable } from "react-beautiful-dnd";

type TicketListProps = {
    cateInfo: {
        id: number;
        name: string;
    };
    index: number;
    children: React.ReactNode;
};

export const TicketList: React.FC<TicketListProps> = ({
    cateInfo,
    // index,
    children,
}) => {
    return (
        <Droppable droppableId={cateInfo.id.toString()} type="droppableItem">
            {({ innerRef, droppableProps, placeholder }) => (
                <div className="flex flex-col">
                    <h3 className="mb-3">{cateInfo.name}</h3>

                    <div
                        ref={innerRef}
                        {...droppableProps}
                        className="border-2 border-solid border-white w-48"
                    >
                        <div>{children}</div>
                        {placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
};
