import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

interface Image {
    author: string,
    image_address: string,
    _id: string,
}

interface ImageProps {
    image: Image
}

export const Image = () => {

    const location = useLocation()
    const { image } = location.state as ImageProps
 
  return (
    <div>
        <img src={image.image_address} alt={image.author} width="300" className="gallery-image"/>
    </div>
  )
}
