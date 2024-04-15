export const postCollection = async (
    domain: string | undefined,
    data: object
) => {
    // try {
    //     const res = await fetch(
    //         `http://localhost:3000/${domain?.toLowerCase()}/`
    //     );
    //     const data = await res.json();
    //     console.log(data);
    // } catch (error) {
    //     const Error = error as Error;
    //     console.log(Error.message);
    // }

    try {
        await fetch(`http://localhost:3000/${domain?.toLowerCase()}/`, {
            method: "POST",
            body: JSON.stringify({
                name: "FrontEnd",
                ...data,
                timestamp: new Date().getTime(),
            }),
            // headers: new Headers({
            //     "Content-Type": "application/json",
            // }),
        });
    } catch (error) {
        const Error = error as Error;
        console.log(Error.message);
    }
};
