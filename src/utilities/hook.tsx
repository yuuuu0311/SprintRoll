import { useEffect, useState } from "react";

// interface
import { CollectionFace } from "@/interface";

export const useDomainCollection = (domain: string | undefined) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [domainCollection, setDomainCollection] = useState<CollectionFace[]>(
        []
    );

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `http://localhost:3000/${domain?.toLowerCase()}/`
                );
                const { collection } = await res.json();

                setLoading(false);
                setDomainCollection(collection);
            } catch (error) {
                setLoading(false);
                setError(true);

                const Error = error as Error;
                console.log(Error.message);
            }
        })();
    }, [domain]);

    return { loading, error, domainCollection, setDomainCollection };
};
