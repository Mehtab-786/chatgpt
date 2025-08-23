const express = require('express')
const userRouter = express.Router()
const {userLogin, userRegister} = require('../controllers/user.controllers')

userRouter.post('/register',userRegister)

userRouter.post('/login', userLogin)

module.exports = userRouter