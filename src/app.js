require('dotenv').config()
const express = require('express')
const cookieParser =  require('cookie-parser')
const userRouter = require('./routes/user.routes')
const chatRouter = require('./routes/chat.routes')

const app = express()

app.use(cookieParser())

app.use(express.json())

app.use('/api/auth', userRouter)
app.use('/api/chat', chatRouter)

module.exports = app