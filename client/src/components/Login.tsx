import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext'

const Login = () => {

    const navigate = useNavigate()
    const { dispatch } = useUserContext();

    const [email, setEmail] = useState('kalle.riit@gmail.com')
    const [password, setPassword] = useState('qwerty')

    axios.defaults.withCredentials = true

    // Iga kord kui Login component mountib, re-fetchib client andmed
    useEffect(() => {
        axios.get('http://localhost:4000/api')
        .then(res => {
            if (res.data.valid === true){
                dispatch({ type: 'LOGIN', payload: res.data.user })
                navigate('/')
            } else {
                navigate('/login')
            }
        })
    }, [navigate, dispatch])


    // login vormi saatmine
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (email === '' || password === '') {
            alert('Please enter all fields')
            return
        } else {
            const response = await axios.post('http://localhost:4000/account/login',
         {
            email: email,
            password: password
        }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            if(response.data.Login === true){
                navigate('/')
            }
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
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="submit-container">
                    <button type='submit'>Log in</button>
                </div>
            </form>
        </div>
  )
}

export default Login;