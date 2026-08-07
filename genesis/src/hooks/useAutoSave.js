import { useEffect } from "react";

export default function useAutosave(
    value,
    callback,
    delay = 800
) {
    useEffect(() => {

        const timeout = setTimeout(() => {
            callback();
        }, delay);

        return () => clearTimeout(timeout);

    }, [value]);
}