export const postCollection = async (
    domain: string | undefined,
    data: object
) => {
    console.log(
        JSON.stringify({
            ...data,
            timestamp: new Date().getTime(),
        })
    );

    try {
        await fetch(`http://localhost:3000/${domain?.toLowerCase()}/`, {
            method: "POST",
            body: JSON.stringify({
                ...data,
                timestamp: new Date().getTime(),
            }),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });
    } catch (error) {
        const Error = error as Error;
        console.log(Error.message);
    }
};

// export const postTicket = async (domain: string) => {
//     try {
//         const res = await fetch(`http://localhost:3000/${domain}/`);
//         const data = await res.json();

//         console.log(data);
//     } catch (error) {
//         const Error = error as Error;
//         console.log(Error.message);
//     }
// };
