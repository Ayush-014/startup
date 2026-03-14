import { useCallback, useMemo, useReducer, useState } from "react";
import { useFetchPhotos } from "../hook/useFetchPhotos";
import Spinner from "../components/Spinner";
import Card from "../components/Card";
import { FavReducer, loadFav, toggleFavourite } from "../reducer/useReducer";


function SearchBar({ value, onChange }) {
    return (
        <div className="w-full max-w-md">
            <input
                id="search"
                type="text"
                value={value}
                onChange={onChange}
                placeholder="e.g. Alejandro Escamilla"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" />
        </div>
    )
}

export default function Home() {
    const { photos, loading, error } = useFetchPhotos();
    const [text, setText] = useState('');

    const handleSearchChange = useCallback((e) => {
        setText(e.target.value);
    })

    const filteredphotos = useMemo(() => {
        const q = text.trim().toLowerCase();
        if (!q) return photos;

        return photos.filter((p) =>
            p.author.toLowerCase().includes(q)
        );
    }, [text, photos]);

    const [favourites, dispatch] = useReducer(
        FavReducer,
        undefined,
        loadFav
    );

    const hangleTogglefavourite = useCallback((id) => {
        dispatch({ type: toggleFavourite, id });
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            {/* header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Photo Gallery
                    </h1>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-6">

                {/* search bar */}
                <div className="mt-3 mb-6 flex justify-center">
                    <SearchBar value={text} onChange={handleSearchChange} />
                </div>

                {/* loading spinner */}
                {loading && <Spinner />}

                {/* //error rendering */}
                {error && (
                    <div className="border bg-red-50 border-red-200 rounded-md p-4 text-sm text-red-500">
                        <strong>Failed to load photos: </strong>{error}
                    </div>
                )}

                {!loading && !error && filteredphotos.length === 0 && (
                    <div className="text-sm text-gray-500">
                        No authors match: "{text}"
                    </div>
                )}

                {/* card rendering */}
                {!loading && !error && filteredphotos.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredphotos.map((photo) => (
                            <Card
                                key={photo.id}
                                photo={photo}
                                isFav={favourites.has(photo.id)}
                                onToggleFav={hangleTogglefavourite}
                            />
                        ))}

                    </div>
                )}

            </main>
        </div>
    )
}