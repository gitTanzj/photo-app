import React, { useEffect } from 'react'
import axios from 'axios';

interface GalleryProps {
    user_id: string;
}

interface Image {
    author: string,
    image_address: string,
    _id: string,
}

export const Gallery: React.FC<GalleryProps> = ({ user_id }) => {

    const [images, setImages] = React.useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/image/${user_id}`)
        .then(response => {
            console.log(response)
            setImages(response.data.images)
        })
        .catch((error: Error) => {
            console.log(error)
        })
    }, [user_id])

    return (
        <div className="gallery">
            <div className="gallery-images">
                {images.map((image: Image) => {
                    return (
                        <div key={image._id}>
                            <img src={image.image_address} alt={image.author} width="300"/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
