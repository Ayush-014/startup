import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Card({ photo, isFav, onToggleFav }) {

    const imageUrl = `https://picsum.photos/id/${photo.id}/5000/3333`;

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* image */}
            <img
                src={imageUrl}
                alt={`A Photo by ${photo.author}`}
                loading="lazy"
                className="w-full object-cover block" />

            <div className="px-3 py-2 flex items-center justify-between gap-2">
                <p className="text-sm text-gray-800 truncate">
                    {photo.author}
                </p>

                <button
                    onClick={() => onToggleFav(photo.id)}
                    className="shrink-0 p-1"
                >
                    {isFav ? (
                        <FaHeart className="w-5 h-5 text-red-500" />
                    ) : (
                        <FaRegHeart className="w-5 h-5 text-red-500" />
                    )}
                </button>
            </div>
        </div>
    )
}