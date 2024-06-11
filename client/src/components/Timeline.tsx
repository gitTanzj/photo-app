import { useEffect, useState } from 'react'
import './Timeline.css'
import axios from 'axios';
import { Post } from './Post';
import { CreatePost } from './UI/CreatePost';

export const Timeline = () => {

  const [posts, setPosts] = useState([])
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:4000/post')
    .then(res => setPosts(res.data.posts))
    .catch(err => console.log(err))
  }, [posting])

  return (
    <div className="timeline-container">
      {posting && <CreatePost setPosting={setPosting}/>}

      {posting ? null : 
          <div className="timeline-create-post" onClick={() => {setPosting(true)}}>Create Your Post Here</div>
      }
      {posts.map((post: any) => (
      <>
        <Post key={post._id} title={post.title} description={post.description} images={post.images} author={post.author}/>
        <br/>
      </>
      ))}
    </div>
  )
}
