import { useEffect, useState } from "react";

// dependency
import { useParams } from "react-router-dom";
import { collection, onSnapshot, collectionGroup } from "firebase/firestore";

// utilities
import { db } from "@/utilities/firebase";
import { useUser } from "@/utilities/store";
import { UserFace } from "@/interface";

// interface
import {
    CollectionFace,
    SprintFace,
    TicketFace,
    ProjectFace,
} from "@/interface";

export const useCollections = () => {
    const { project, domain } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [collectionsData, setCollectionsData] = useState<CollectionFace[]>();

    useEffect(() => {
        const collectionsRef = collection(db, "collections");

        const unsubscribe = onSnapshot(collectionsRef, (collection) => {
            setCollectionsData(() =>
                collection.docs
                    .filter(
                        (doc) =>
                            doc.data().domain === domain &&
                            doc.data().project === project
                    )
                    .map((doc) => ({
                        ...(doc.data() as CollectionFace),
                        collectionID: doc.id,
                    }))
                    .sort((a, b) => a.order - b.order)
            );
        });

        return () => unsubscribe();
    }, [domain, project]);

    return { isLoading, collectionsData, setCollectionsData, setIsLoading };
};

export const useTickets = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ticketsData, setTicketsData] = useState<TicketFace[]>();

    useEffect(() => {
        const ticketsRef = collection(db, `collections/${id}/tickets`);

        const unsubscribe = onSnapshot(ticketsRef, (tickets) => {
            setTicketsData(() =>
                tickets.docs
                    .map((doc) => ({
                        ...(doc.data() as TicketFace),
                        collectionID: id,
                        ticketID: doc.id,
                    }))
                    .sort((a, b) => a.order - b.order)
            );
        });

        return () => unsubscribe();
    }, [id]);

    return { isLoading, ticketsData, setTicketsData, setIsLoading };
};

export const useAllTickets = (index?: number) => {
    const { project } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [allTickets, setAllTickets] = useState<TicketFace[]>();
    const [isTicketLoading, setIsTicketLoading] = useState(false);
    const [sprintTickets, setSprintTickets] = useState<TicketFace[]>([]);

    useEffect(() => {
        const ticketsRef = collectionGroup(db, "tickets");

        const unsubscribe = onSnapshot(ticketsRef, (tickets) => {
            setIsLoading(true);

            const allTicketCopy = tickets.docs
                .filter(
                    (ticket) =>
                        !ticket.data().inSprint &&
                        ticket.data().inSprint !== 0 &&
                        ticket.data().project === project
                )
                .map((ticket) => ({
                    ...(ticket.data() as TicketFace),
                    ticketID: ticket.ref.path,
                }));

            const sprintTicketsCopy = tickets.docs
                .filter(
                    (ticket) =>
                        ticket.data().inSprint == index &&
                        ticket.data().project === project
                )
                .map((ticket) => ({
                    ...(ticket.data() as TicketFace),
                    ticketID: ticket.ref.path,
                }))
                .sort(
                    (a, b) =>
                        parseInt(a.status as string) -
                        parseInt(b.status as string)
                );

            setAllTickets(allTicketCopy);
            setSprintTickets(sprintTicketsCopy);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [index, project]);

    return {
        isLoading,
        allTickets,
        isTicketLoading,
        sprintTickets,
        setAllTickets,
        setSprintTickets,
        setIsTicketLoading,
    };
};

export const useSprint = () => {
    const { project } = useParams();
    const [isSprintLoading, setIsSprintLoading] = useState(false);
    const [sprintInfo, setSprintInfo] = useState<SprintFace[]>([]);

    useEffect(() => {
        const sprintsRef = collection(db, "sprints");

        const unsubscribe = onSnapshot(sprintsRef, (collection) => {
            setSprintInfo(
                () =>
                    collection.docs
                        .filter((doc) => doc.data().project === project)
                        .map((doc) => doc.data())
                        .sort((a, b) => a.index - b.index) as []
            );
        });

        return () => unsubscribe();
    }, [project]);

    return { isSprintLoading, setIsSprintLoading, sprintInfo, setSprintInfo };
};

export const useProject = () => {
    const { project } = useParams();
    const { uid } = useUser<UserFace>((state) => state);
    const [isProjectLoading, setIsProjectLoading] = useState(false);
    const [projectInfo, setProjectInfo] = useState<ProjectFace[]>([]);

    useEffect(() => {
        const projectRef = collection(db, "projects");

        const unsubscribe = onSnapshot(projectRef, (collection) => {
            setProjectInfo(
                () =>
                    collection.docs
                        .filter((doc) => doc.data().owner === uid)
                        .map((doc) => ({ ...doc.data(), id: doc.id })) as []
            );
        });

        return () => unsubscribe();
    }, [project, uid]);

    return { isProjectLoading, projectInfo, setIsProjectLoading };
};
