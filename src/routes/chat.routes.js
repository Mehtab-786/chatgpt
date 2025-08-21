const express = require('express')
const { authUser } = require('../middlewares/authUser.middlewares')
const chatModel = require('../models/chat.model')
const chatRouter = express.Router()

chatRouter.post('/',authUser, async (req,res) => {
    const {title} = req.body

    const chat =  await chatModel.create({
        user:req.user._id,
        title
    })

    return res.status(201).json({
        message : "Chat created succefully",
        chat
    })
    
})

module.exports = chatRouter