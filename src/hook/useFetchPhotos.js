import { useEffect, useState } from "react"

export function useFetchPhotos() {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPhotos() {
            // setLoading(true);
            setError(null);

            try {
                const res = await fetch("https://picsum.photos/v2/list?limit=30");
                if(!res.ok) {
                    throw new Error(`Error with status code: (${res.status})`);
                }

                const data = await res.json();
                setPhotos(data);
                // setLoading(false);
            } catch (error) {
                setError(error.message || "Something Went Wrong");
            } finally {
                setLoading(false);
            }
        }
        fetchPhotos();
    });

    return {loading, photos, error};
}