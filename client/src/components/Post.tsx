import React from 'react'
import './Post.css'

interface PostProps {
    title: string,
    description: string,
    images: string[],
    author: string
}

export const Post: React.FC<PostProps> = ({title, description, images, author}) => {
  return (
    <div className="post-container">
        <div className="post-content">
            <h2 className="post-title">{title}</h2>
            <div className="post-images">
                images
            </div>
            <p className="post-description">{description}</p>
            <p className="post-author">Author: {author}</p>
        </div>
    </div>
  )
}
