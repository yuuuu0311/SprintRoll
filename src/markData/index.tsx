export const getCards = (count: number) =>
    Array.from({ length: count }, (v, k) => k).map((i) => ({
        id: i,
        title: `title${i}`,
        sortOrder: i,
    }));

export const getCols = (count: number) =>
    Array.from({ length: count }, (v, k) => k).map((i) => ({
        id: i,
        title: `list-${i}`,
    }));
