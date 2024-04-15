export const postDomainCollection = async () => {
    try {
        const res = await fetch(`http://localhost:3000/${domain}/`);
        const data = await res.json();

        console.log(data);
    } catch (error) {
        const Error = error as Error;
        console.log(Error.message);
    }
};
