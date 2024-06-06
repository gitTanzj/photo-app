import React, { useEffect } from 'react'
import axios from 'axios';
import './Gallery.css';
import { useUserContext } from '../hooks/useUserContext';

interface Image {
    author: string,
    image_address: string,
    _id: string,
}

export const Gallery: React.FC = () => {

    const [images, setImages] = React.useState([])
    const { state } = useUserContext();

    useEffect(() => {
        axios.get(`http://localhost:4000/image/${state.user.user_id}`)
        .then(response => {
            console.log(response)
            setImages(response.data.images)
        })
        .catch((error: Error) => {
            console.log(error)
        })
    }, [state.user.user_id])

    return (
        <div className="gallery">
            <div className="gallery-images">
                {images.length === 0 ? <div>No images found.</div> : images.map((image: Image) => {
                    return (
                        <div key={image._id}>
                            <img src={image.image_address} alt={image.author} width="300" className="gallery-image"/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
