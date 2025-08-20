const express = require('express')
const { authLogin, authRegister } = require('../controllers/auth.controllers')
const userRouter = express.Router()

userRouter.post('/register',authRegister)

userRouter.post('/login', authLogin)



module.exports = userRouter