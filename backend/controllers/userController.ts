import { request, response, Router } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';

const router: Router = Router();

interface User {
    username: string;
    email: string;
}

const register = async (req, res) => {
    console.log(req.body);
    
    const emails = await User.find({email: req.body.email})
    if(emails.length > 0){
        return res.send({message: 'Email already exists'})
    }

    const users = await User.find({username: req.body.username})
    if(users.length > 0){
        return res.send({message: 'Username already exists'})
    }

    
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        .then(user => {
            req.session.user = {
                username: user.username,
                user_id: user.id
            };
            console.log(req.session)
            res.status(201).json({
                message: 'New user is registered',
                user: user,
                user_session: req.session.user
            })
        })
    });
}

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const emails = await User.find({email: email})
    if(emails.length > 0){
        bcrypt.compare(password, emails[0].password, (err, result) => {
            if(result){
                req.session.user = {
                    username: emails[0].username,
                    user_id: emails[0].id
                }
                res.status(200).json({
                    message: 'User is logged in',
                    user: emails[0],
                    user_session: req.session.user,
                    Login: true
                })
            } else {
                res.send({message: 'Password is incorrect'})
            }
        })
    } else {
        res.send({message: 'Email is incorrect'})
    }
}

const logout = async (req, res) => {
    req.session.destroy();
    res.status(200).json({
        message: 'User is logged out',
        logout: true
    })
}


export { register, login, logout }