import React, {FormEvent, useState} from 'react';
import './CreatePost.css';
import axios from 'axios';
import { useUserContext } from '../../hooks/useUserContext';

interface createPostProps {
    setPosting: (value: boolean) => void
}

export const CreatePost: React.FC<createPostProps> = ({ setPosting }) => {

    const { state } = useUserContext();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log('submitting post')
    const response = await axios.post('http://localhost:4000/post', {
        title: title,
        description: description,
        author: state.user.user_id
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        console.log(res)
        setTitle('')
        setDescription('')
        setPosting(false)
    })
    .catch((err: Error) => console.log(err.message))
    return response
  }

  return (
    <div className="create-post-container">
        <div className="create-post">
            <h1>Create post</h1>
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title"><input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'/></label>
                </div>
                <div className="form-group">
                    <label htmlFor="content"><textarea id="content" name="content" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Type something original!'></textarea></label>
                </div>
                <div className="form-group">
                    <button id='create-post-button' type="submit">Create post</button>
                    <button id="cancel-button" onClick={() => setPosting(false)}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}
