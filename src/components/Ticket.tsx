import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";

// dependency
import { Draggable } from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { useDebounce } from "use-debounce";
// interface
import { TicketFace, UserFace } from "@/interface";

// components
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

// utilities
import { deleteTicket, getDomainDeveloper } from "@/utilities";

export const Ticket: React.FC<{
    ticketInfo: TicketFace;
    index: number;
    isInCollection?: string;
}> = ({ isInCollection, index, ticketInfo }) => {
    const { domain } = useParams();

    const [assignedDeveloper, setAssignedDeveloper] = useState<
        UserFace[] | void
    >();
    const [searchDeveloper, setSearchDeveloper] = useState<string>();
    const [searchValue] = useDebounce(searchDeveloper, 1000, {
        leading: true,
        maxWait: 1000,
    });

    const [dialogActive, setDialogActive] = useState(false);

    const ticketsClass = classNames(
        twMerge("p-2 bg-blue-700 rounded-md hover:bg-blue-500 transition")
    );

    const handleDialogToggle = () => {
        setDialogActive((prev) => (prev ? false : true));
    };

    const handelSearchDeveloper = async (e: ChangeEvent<HTMLInputElement>) => {
        setSearchDeveloper(e.target.value);
        const developerInfo = await getDomainDeveloper(
            domain as string,
            searchValue as string
        );
        setAssignedDeveloper(developerInfo);
    };

    return (
        <>
            {ticketInfo.ticketID !== undefined && (
                <Draggable index={index} draggableId={ticketInfo.ticketID}>
                    {({ innerRef, draggableProps, dragHandleProps }) => (
                        <div
                            ref={innerRef}
                            className={ticketsClass}
                            {...draggableProps}
                            {...dragHandleProps}
                            onClick={handleDialogToggle}
                        >
                            {/* {ticketInfo.ticketID} */}
                            {ticketInfo.title} - {ticketInfo.order}
                        </div>
                    )}
                </Draggable>
            )}
            {dialogActive && (
                <Dialog
                    handleDialogToggle={handleDialogToggle}
                    title={ticketInfo.title as string}
                >
                    <div className="mb-4">
                        <div>collectionID : {isInCollection}</div>
                        <div>ticketID : {ticketInfo.ticketID}</div>
                        <div>due date:</div>
                        <div>assign develop</div>
                        <input
                            type="text"
                            onChange={(e) => handelSearchDeveloper(e)}
                        />
                        <ul>
                            {assignedDeveloper?.length === 0 ? (
                                <div>developer not founded</div>
                            ) : (
                                assignedDeveloper?.map((developer) => (
                                    <li key={developer.uid}>
                                        {developer.name}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                    <Button
                        rounded
                        primary
                        onClickFun={() => {
                            deleteTicket(
                                isInCollection as string,
                                ticketInfo.ticketID as string,
                                index as number
                            );
                        }}
                    >
                        delete
                    </Button>
                </Dialog>
            )}
        </>
    );
};
