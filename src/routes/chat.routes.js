const express = require('express')
const { authUser } = require('../middlewares/authUser.middlewares')
const { createChat } = require('../controllers/chat.controllers')
const chatRouter = express.Router()

chatRouter.post('/',authUser, createChat)

module.exports = chatRouter