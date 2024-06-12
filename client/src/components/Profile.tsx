import axios from 'axios';
import './Profile.css';
import React, { useEffect,useState } from 'react';
import { useUserContext } from '../hooks/useUserContext';
import { Post } from './Post';

export const Profile = () => {
  const { state } = useUserContext();
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/post')
    .then(res => setPosts(res.data.posts))
    .catch(err => console.log(err))
  }, []);

  return (
    <div className='profile-container'>
      <div className='profile'>
        <div className='user-profile-rect'>
          <div className="user-profile-circle">
            <h1>IMG.JPG</h1>
            <h2>{state.user.username}</h2>
          </div>
        </div>
          {state.user.username.length === 0 ? (
            <div>No profile available</div>
          ) : (
        <div>
      <div className='user-posts'>
        {posts.map((post: any) => (
        <>
          <Post key={post._id} title={post.title} description={post.description} images={post.image} author={post.author}/>
          <br/>
        </>
        ))}
      </div>
        </div>
        )}
      </div>
    </div>
  );
};
