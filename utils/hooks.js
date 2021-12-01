import { useEffect, useState } from "react";

export const useFetch = (url, initialValue) => {
    const [result, setResult] = useState(initialValue);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url);
            const json = await res.json();

            setResult(json);
        };

        fetchData();
    }, []);

    return result;
};
