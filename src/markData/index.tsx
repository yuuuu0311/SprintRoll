export const getCards = (count: number) =>
    Array.from({ length: count }, (v, k) => k).map((i) => ({
        id: i,
        title: `title${i}`,
        sortOrder: i,
    }));
