import { TicketFace } from "@/interface";
import { getProgressPercentage } from "@/utilities";
import { describe, test, expect } from "@jest/globals";

const mockTicketArray_zero = [
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
        order: 3,
        id: 3,

        status: -1,
        ticketID: "ngIOhD9eoAdZBKfKG3DD",
        title: "廣告區塊切版3",
    },
] as TicketFace[];

const mockTicketArray_half = [
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

        status: 1,
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

        status: 1,
        ticketID: "ngIOhD9eoAdZBKfKG3DD",
        title: "廣告區塊切版3",
    },
] as TicketFace[];

const mockTicketArray_one_third = [
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
        status: 1,
        ticketID: "ngIOhD9eoAdZBKfKG3DD",
        title: "廣告區塊切版2",
    },
] as TicketFace[];

describe("getProgressPercentage module", () => {
    test("getProgressPercentage by mockTicketArray", () => {
        expect(getProgressPercentage(mockTicketArray_zero)).toBe(0);
    });
});

describe("getProgressPercentage module", () => {
    test("getProgressPercentage by mockTicketArray", () => {
        expect(getProgressPercentage(mockTicketArray_half)).toBe(50);
    });
});

describe("getProgressPercentage module", () => {
    test("getProgressPercentage by mockTicketArray", () => {
        expect(getProgressPercentage(mockTicketArray_one_third)).toBe(33);
    });
});
