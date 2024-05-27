import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export const Header = () => {
    const navigate = useNavigate();

    // Logout funktsioon
    const handleLogout = () => {
        axios.get('http://localhost:4000/account/logout')
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
        <div className="header-container">
            <div className="header-text">
                <h1>Fotokas</h1>
            </div>
            <div className="logout">
                <button onClick={() => handleLogout()}>Logout</button>
            </div>
        </div>
    )
}
