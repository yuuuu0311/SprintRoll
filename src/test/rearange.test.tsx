import { TicketFace } from "@/interface";
// import { rearange } from "./rearange";
import { rearange } from "@/utilities";
// import { rearange } from "../utilities/index.tsx";
// import { rearange } from "../../src/utilities/index.tsx";
import { describe, test, expect } from "@jest/globals";

const mockTicketArray = [
    {
        collectionID: "miYoJELBhHuMvL78jmAE",
        createdTime: { seconds: 1715666411, nanoseconds: 11000000 },
        description: "5/14收到UI Team的Figma檔案",
        domain: "frontend",
        // inSprint: null,
        label: {},
        order: 0,

        status: -1,
        ticketID: "ngIOhD9eoAdZBKfKG3DD",
        title: "廣告區塊切版",
        id: 0,
    },
    {
        collectionID: "miYoJELBhHuMvL78jmAE",
        createdTime: { seconds: 1715666411, nanoseconds: 11000000 },
        description: "5/14收到UI Team的Figma檔案",
        domain: "frontend",
        // inSprint: null,
        label: { feature: true },
        order: 1,
        id: 1,

        status: -1,
        ticketID: "ngIOhD9eoAdZBKfKG3DD",
        title: "廣告區塊切版",
    },
    {
        collectionID: "miYoJELBhHuMvL78jmAE",
        createdTime: { seconds: 1715666411, nanoseconds: 11000000 },
        description: "5/14收到UI Team的Figma檔案",
        domain: "frontend",
        // inSprint: null,
        label: { feature: true },
        order: 2,
        id: 2,

        status: -1,
        ticketID: "ngIOhD9eoAdZBKfKG3DD",
        title: "廣告區塊切版2",
    },
    {
        collectionID: "miYoJELBhHuMvL78jmAE",
        createdTime: { seconds: 1715666411, nanoseconds: 11000000 },
        description: "5/14收到UI Team的Figma檔案",
        domain: "frontend",
        // inSprint: null,
        label: { feature: true },
        order: 3,
        id: 3,

        status: -1,
        ticketID: "ngIOhD9eoAdZBKfKG3DD",
        title: "廣告區塊切版3",
    },
] as TicketFace[];

describe("rearrange module", () => {
    test("rearrange tickets", () => {
        expect(rearange(mockTicketArray, 0, 3)).toStrictEqual([
            {
                collectionID: "miYoJELBhHuMvL78jmAE",
                createdTime: { seconds: 1715666411, nanoseconds: 11000000 },
                description: "5/14收到UI Team的Figma檔案",
                domain: "frontend",
                // inSprint: null,
                label: { feature: true },
                order: 1,
                id: 1,

                status: -1,
                ticketID: "ngIOhD9eoAdZBKfKG3DD",
                title: "廣告區塊切版",
            },
            {
                collectionID: "miYoJELBhHuMvL78jmAE",
                createdTime: { seconds: 1715666411, nanoseconds: 11000000 },
                description: "5/14收到UI Team的Figma檔案",
                domain: "frontend",
                // inSprint: null,
                label: { feature: true },
                order: 2,
                id: 2,

                status: -1,
                ticketID: "ngIOhD9eoAdZBKfKG3DD",
                title: "廣告區塊切版2",
            },
            {
                collectionID: "miYoJELBhHuMvL78jmAE",
                createdTime: { seconds: 1715666411, nanoseconds: 11000000 },
                description: "5/14收到UI Team的Figma檔案",
                domain: "frontend",
                // inSprint: null,
                label: { feature: true },
                order: 3,
                id: 3,

                status: -1,
                ticketID: "ngIOhD9eoAdZBKfKG3DD",
                title: "廣告區塊切版3",
            },
            {
                collectionID: "miYoJELBhHuMvL78jmAE",
                createdTime: { seconds: 1715666411, nanoseconds: 11000000 },
                description: "5/14收到UI Team的Figma檔案",
                domain: "frontend",
                // inSprint: null,
                label: {},
                order: 0,

                status: -1,
                ticketID: "ngIOhD9eoAdZBKfKG3DD",
                title: "廣告區塊切版",
                id: 0,
            },
        ]);
    });
});
