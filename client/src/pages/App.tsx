import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useUserContext } from '../hooks/useUserContext';


interface User {
  user_id: string;
  username: string;
  email: string;
}

function App() {
  const { dispatch } = useUserContext();

  const navigate = useNavigate();

  // Iga kord kui komponent mountib, re-fetchib client andmed
  useEffect(() => {
    axios.get('http://localhost:4000/api')
    .then(response => {
      if (response.data.valid){
        dispatch({ type: 'LOGIN', payload: response.data.user as User })
      } else {
        navigate('/login')
      } 
    })
    .catch(error => {
      error.response ? console.log(error.response) : console.log(error)
    })
  }, [navigate, dispatch])

  return (
    <div className="App">
      <Header/>
      <div className="container">
        <Outlet/>
      </div> 
      <Footer/>
    </div>
  );
}

export default App;
