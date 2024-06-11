import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Gallery.css';
import { useUserContext } from '../hooks/useUserContext';
import { useNavigate } from 'react-router-dom';
import { ImageUpload } from './UI/ImageUpload';

interface Image {
    author: string,
    image_address: string,
    _id: string,
}

export const Gallery: React.FC = () => {

    const navigate = useNavigate()

    const [images, setImages] = useState([])
    const [uploading, setUploading] = useState(false)
    const { state } = useUserContext();

    useEffect(() => {
        if(state.user) {
            axios.get(`http://localhost:4000/image/${state.user.user_id}`)
            .then(response => {
                console.log(response)
                setImages(response.data.images)
            })
            .catch((error: Error) => {
                console.log(error)
            })
        }
    }, [state.user, uploading])

    return (
        <div className="gallery-container">
            {uploading && <ImageUpload setUploading={setUploading}/>}
            <div className="gallery-images">
                {images.length === 0 ? <p>No images found.</p> : images.map((image: Image) => {
                    return (
                        <div key={image._id} className="gallery-image" onClick={() => navigate(`/${image._id}`, {state: { image: image }})}>
                            <img src={image.image_address} alt={image.author} width="300" className="gallery-image"/>
                        </div>
                    )
                })}
            </div>
            {!uploading && 
                <div className="gallery-image-upload">
                    <button onClick={() => setUploading(true)}>Upload New Image</button>
                </div>
            }
        </div>
    )
}
