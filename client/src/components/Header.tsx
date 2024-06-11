import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';

export const Header = () => {
    const navigate = useNavigate();
    const { dispatch } = useUserContext();

    // Logout funktsioon
    const handleLogout = () => {
        axios.get('http://localhost:4000/account/logout')
        .then(response => {
        if (response.data.logout){
            dispatch({ type: 'LOGOUT' })
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
                <NavLink to="/">
                    <h1 className="header-logo">Fotokas</h1>
                </NavLink>
            </div>
            <div className="header-links">
                <NavLink to="gallery">My Gallery</NavLink>
                <NavLink to="profile">My Profile</NavLink>
            </div>
            <div className="logout">
                <button onClick={() => handleLogout()}>Logout</button>
            </div>
        </div>
    )
}
