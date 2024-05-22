import { TicketFace } from "@/interface";

export const getProgressPercentage = (sprintTickets: TicketFace[]) => {
    const havingStatus = sprintTickets.filter((ticket) => ticket.status !== -1);

    return havingStatus.length === 0 && sprintTickets.length === 0
        ? 0
        : Math.floor((havingStatus.length / sprintTickets.length) * 100);
};
