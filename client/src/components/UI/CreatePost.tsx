import React, {useState} from 'react';
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

  const handleSubmit = () => {
    console.log('submitting post')
    axios.post('http://localhost:4000/post', {
        title: title,
        description: description,
        author: state.user.user_id
    })
    .then(res => {
        console.log(res)
        setTitle('')
        setDescription('')
        setPosting(false)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="create-post-container">
        <div className="create-post">
            <h1>Create post</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Description</label>
                    <textarea id="content" name="content" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <button type="submit">Create post</button>
                    <button onClick={() => setPosting(false)}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}
