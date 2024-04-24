import express from 'express';
import bodyParser from 'body-parser'
import sessions from 'express-session'
import cors from 'cors'

const app = express();
const PORT = 4000;

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
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
    if (req.session && req.session.user) {
        console.log(req.session)

      res.json({ valid: true, username: req.session.user.username });
    } else {
      res.json({ valid: false });
    }
});

import accountRoutes from './routes/account'
app.use('/account', accountRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})