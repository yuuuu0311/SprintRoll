export const markCategories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
];

export const markItems = [
    { id: 1, name: "item1", category: 1 },
    { id: 2, name: "item2", category: 1 },
    { id: 3, name: "item3", category: 1 },
    { id: 4, name: "item4", category: 2 },
    { id: 5, name: "item5", category: 2 },
    { id: 6, name: "item6", category: 2 },
];

export const markFrontEndData = {
    collection: [
        {
            id: 0,
            name: "Collection 1",
            tickets: [
                { id: 1, name: "item1" },
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
