export default function Card({photo}) {

    const imageUrl = `https://picsum.photos/id/${photo.id}/5000/3333`;

    return (
        <div>
            //image
            <img
                src={imageUrl}
                alt={`A Photo by ${photo.author}`}
                loading="lazy"
                className="w-full object-cover block" />

        </div>
    )
}