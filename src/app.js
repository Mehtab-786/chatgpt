require('dotenv').config()
const express = require('express')
const userRoutes = require('./routes/user.routes')
const chatRoutes = require('./routes/chat.routes')
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use('/api/auth',userRoutes)
app.use('/api/chat',chatRoutes)

module.exports = app