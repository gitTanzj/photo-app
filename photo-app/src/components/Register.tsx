import React, { useState } from 'react'
import axios from 'axios';

const Register = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (username === '' || password === '' || email === '') {
            alert('Please enter all fields')
            return
        } else {
          const response = await axios.post('http://localhost:4000/api/account/register',
         {
            email: email,
            username: username,
            password: password
        }, {
            headers: {
              'Content-Type': 'authorization/json'
            }
          })
          .then(response => {
            alert(response.data.message)
            setUsername('')
            setPassword('')
            setEmail('')
          })
          .catch(error => {
            console.log(error)
          })
        return response
        }
    }

  return (
    <div>
        <form className='register-form' onSubmit={(event) => handleSubmit(event)}>
            <div className='register-field'>
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='register-field'>
                <label>Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className='register-field'>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="submit-container">
              <button type='submit'>Create account</button>
            </div>
        </form>
    </div>
  )
}

export default Register
