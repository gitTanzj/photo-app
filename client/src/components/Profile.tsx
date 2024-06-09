import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useUserContext } from '../hooks/useUserContext';
import { Post } from './Post';

interface ProfileData {
  username: string;
  bio: string;
}




export const Profile = () => {
  const [profileData, setProfile] = React.useState<ProfileData[]>([]);
  const { state } = useUserContext();
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:4000/user/${state.user.username}`)
      .then(response => {
        console.log('fetch response', response);
        setProfile(response.data.profile_data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, [state.user.username]); 

  useEffect(() => {
    axios.get('http://localhost:4000/post')
    .then(res => setPosts(res.data.posts))
    .catch(err => console.log(err))
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      
      
      {state.user.username.length === 0 ? (
        <div>No profile available</div>
      ) : ( 
      
      <div>
        <h2>{state.user.username}</h2>
     <div>
    
      {posts.map((post: any) => (
        <Post key={post._id} title={post.title} description={post.description} images={post.image} author={post.author}/>
      ))}
     </div>
      </div>
     
      
        
      )}
    </div>
  );
};
