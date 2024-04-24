import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';

interface User {
    username: string;
    email: string;
}

const register = async (req: Request, res: Response) => {
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
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(user => {
            if(req.session){
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
            } else{
                res.json({
                    "message": "Session is not available"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || 'Error occurred while creating the User.'
            });
        })
    });
}

const login = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const emails = await User.find({email: email})
    if(emails.length > 0){
        bcrypt.compare(password, emails[0].password, (err, result) => {
            if(req.session){
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
            } else{
                res.json({
                    "message": "Session is not available"
                })
            }
        })
    } else {
        res.send({message: 'Email is incorrect'})
    }
}

const logout = async (req: Request, res: Response) => {
    if(req.session){
        req.session.destroy((err) => {
            if(err){
                return console.log(err);
            }
        });
        res.status(200).json({
            message: 'User is logged out',
            logout: true
        })
    }
}


export { register, login, logout }