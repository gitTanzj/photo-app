import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';
import ImageUpload from '../components/ImageUpload';
import { Gallery } from './Gallery';

import { Header } from '../components/Header';
import {useCookies } from 'react-cookie'
import useSessionTimeout from '../hooks/useSessionTimeout';


interface User {
  user_id: string;
  username: string;
  email: string;
}

interface SessionMaxAgeResponse {
  maxAge: number;
}


function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState<User>({user_id: '', username:'', email: ''});
  const [cookies,setCookie] = useCookies(['user']);
  const [sessionMaxAge, setSessionMaxAge] = useState<number | null>(null);


  // Iga kord kui komponent mountib, re-fetchib client andmed
  useEffect(() => {
    axios.get('http://localhost:4000/api')
    .then(response => {
      if (response.data.valid){
        setUser(response.data.user)
        setCookie('user', response.data.user, {path: '/'})
      } else {
        navigate('/login')
      } 
    })
    .catch(error => {
      error.response ? console.log(error.response) : console.log(error)
    })
  }, [navigate])

  // MaxAge  

  useEffect(() => {
    const fetchSessionMaxAge = async () => {
      try {
        const response = await fetch('/api/sessionMaxAge');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: SessionMaxAgeResponse = await response.json();
        setSessionMaxAge(data.maxAge);
      } catch (error) {
        console.error('Error fetching session maxAge:', error);
      }
    };

    fetchSessionMaxAge();
  }, []);

  useSessionTimeout(sessionMaxAge);

  return (
    <div className="App">
      <Header/>
      <div className="container">
        <Gallery user_id={user.user_id}/>
        {/* <ImageUpload/> */}
      </div> 
    </div>
  );
}

export default App;
