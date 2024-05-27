import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';
import ImageUpload from '../components/ImageUpload';

import { Header } from '../components/Header';

interface User {
  username: string;
  email: string;
}

function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState<User>({username:'', email: ''});


  // Iga kord kui komponent mountib, re-fetchib client andmed
  useEffect(() => {
    axios.get('http://localhost:4000/api')
    .then(response => {
      if (response.data.valid){
        setUser(response.data.user)
      } else {
        navigate('/login')
      } 
    })
    .catch(error => {
      error.response ? console.log(error.response) : console.log(error)
    })
  }, [navigate])

  return (
    <div className="App">
      <Header/>
      <div className="container">
        <h1>Welcome {user.username}!!</h1>
        <ImageUpload/>
      </div> 
    </div>
  );
}

export default App;
