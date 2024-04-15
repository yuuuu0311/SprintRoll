export const markFrontEndData = {
    name: "FrontEnd",
    collection: [
        {
            id: 0,
            name: "Collection 1",
            tickets: [
                {
                    id: 1,
                    name: "item1",
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam praesentium voluptatem itaque ab obcaecati sit natus nesciunt, qui laudantium dolores?",
                    createdTime: "2024/4/15",
                    assignDevelop: ["Davis's uid"],
                },
                { id: 2, name: "item2" },
                { id: 3, name: "item3" },
            ],
        },
        {
            id: 1,
            name: "Collection 2",
            tickets: [
                { id: 1, name: "item3" },
                { id: 2, name: "item2" },
                { id: 3, name: "item1" },
            ],
        },
        // ...
    ],
};
export const markBackEndData = {
    name: "BackEnd",
    collection: [
        {
            id: 0,
            name: "BE-Collection 1",
            tickets: [
                { id: 1, name: "item1" },
                { id: 2, name: "item2" },
                { id: 3, name: "item3" },
            ],
        },
        {
            id: 1,
            name: "BE-Collection 2",
            tickets: [
                { id: 1, name: "item3" },
                { id: 2, name: "item2" },
                { id: 3, name: "item1" },
            ],
        },
        // ...
    ],
};
