// dependency
// import { Droppable, Draggable } from "react-beautiful-dnd";

//icon
import { MdOutlineDelete } from "react-icons/md";

export const GarbageCan: React.FC = () => {
    return (
        <div className="flex items-center px-3 py-2 gap-4 text-xl rounded-md bg-rose-700 text-white fixed bottom-10 right-10 select-none">
            drop tickets to delete
            <span className="text-2xl">
                <MdOutlineDelete />
            </span>
        </div>

        // <Droppable droppableId={collectionInfo.collectionID}>
        //     {(
        //         { innerRef, droppableProps, placeholder },
        //         { isDraggingOver }
        //     ) => (

        //     )}
        // </Droppable>
    );
};
