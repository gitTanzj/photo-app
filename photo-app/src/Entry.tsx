import React from 'react'
import Register from './components/Register'
import Login from './components/Login'

export const Entry = () => {

  const [register, setRegister] = React.useState(false)

  return (
    <div className="container">
      <div className="entry">
        {register ? 
        <div className="register">
          <h1>Register</h1>
          <Register/>
        </div>
        :
        <div className="register">
          <h1>Login</h1>
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