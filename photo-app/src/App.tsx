import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  email: string;
}

function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState<User>({username:'', email: ''});

  useEffect(() => {
    axios.get('http://localhost:4000/api/')
    .then(response => {
      if (response.data.valid){
        setUser(response.data.user)
      } else {
        navigate('/login')
      } 
      console.log(response.data)
    })
    .catch(error => {
      error.response ? console.log(error.response) : console.log(error)
    })
  })

  const handleLogout = () => {
    axios.get('http://localhost:4000/api/logout')
    .then(response => {
      if (response.data.logout){
        navigate('/login')
      }
      else {
        console.log(response)
      }
    })
    .catch(error => {
      error.response ? console.log(error.response) : console.log(error)
    })
  }

  return (
    <div className="App">
      <div className="container">
        <div className="logout">
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
        <h1>Welcome {user.email}!!</h1>
      </div> 
    </div>
  );
}

export default App;
