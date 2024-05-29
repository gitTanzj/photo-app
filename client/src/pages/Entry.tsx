import React, { useEffect } from 'react'
import Register from '../components/Register'
import Login from '../components/Login'
import './Entry.css'
// import { CookiesProvider, useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export const Entry = () => {

  const [register, setRegister] = React.useState(false)
  // const [cookies,setCookie] = useCookies(['user']);
  const navigate = useNavigate();

  // register vormi ja login vormi switch





  return (
    <div className="container">
      <div className="entry">
        {register ? 
        <div className="register">
          <h1>Register</h1>
          <Register register={register }setRegister={setRegister}/>
        </div>
        :
        <div className="register">
          <h1>Log in</h1>
          <Login/>
        </div>
        }
        <div className="register-switch">
          <p>Or maybe you want to <b
              onClick={() => setRegister(!register)}
              style={{cursor: 'pointer', textDecoration: 'underline'}}
            >
              {register ? "login" : "register"}
          </b></p>
        </div>
      </div>
    </div>
      
  )
}