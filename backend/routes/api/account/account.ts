const express = require('express')
const router = express.Router()

import { register, login, logout } from '../../../controllers/userController' 

router.get('/logout', logout)

router.post('/register', register);
router.post('/login', login);


module.exports = router