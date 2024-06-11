import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Image.css'
import axios from 'axios';

interface Image {
    author: string,
    image_address: string,
    _id: string,
    image_public_id: string
}

interface ImageProps {
    image: Image
}

export const Image = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const { image } = location.state as ImageProps

    const handleDelete = () => {
      axios.delete(`http://localhost:4000/image`, {
        data: {
          image_id: image._id,
          image_public_id: image.image_public_id
        }
      })
      .then(response => {
        console.log('Image deleted sucessfully')
        navigate(-1)
      })
      .catch((error: Error) => {
        console.error(error)
      })
      
    }
 
  return (
    <div className="image-page-container">
      <div className="navigate-back">
        <button onClick={() => navigate(-1)}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
          <span className="material-symbols-outlined">
              chevron_left
          </span>
        </button>
      </div>
      <div className="image-container">
        <img src={image.image_address} alt={image.author} width="300" className="gallery-image"/>
      </div>
      <div className="image-functions">
        <button onClick={handleDelete}>Delete image</button>
      </div>
    </div>
  )
}
