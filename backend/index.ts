import express from 'express';
import bodyParser from 'body-parser'
import sessions from 'express-session'
import cors from 'cors'

import mongoose from 'mongoose';
import dotenv from 'dotenv';

mongoose.connect(dotenv.config().parsed?.MONGO_URI as string);
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
})
  
database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}))

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.use(sessions({
    secret: 'thisismysecretkey',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false
}))

app.get('/api', (req, res) => {
    if (req.session && req.session.user) {
      res.json({ valid: true, user: req.session.user });
    } if(req.session === undefined || req.session.user === undefined) {
        res.json({ valid: false });
    }
});

import accountRoutes from './routes/account'
app.use('/account', accountRoutes)

import postRoutes from './routes/post'
app.use('/post', postRoutes)

import imageRoutes from './routes/image'
app.use('/image', imageRoutes)

import commentRoutes from './routes/comment'
app.use('/comment', commentRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})