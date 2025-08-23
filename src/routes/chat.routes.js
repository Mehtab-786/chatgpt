const express = require('express')
const { authUser } = require('../middlewares/auth.middlewares')
const chatRouter = express.Router()
const {createChat} = require('../controllers/chat.controllers')

chatRouter.post('/', authUser , createChat)

module.exports = chatRouter