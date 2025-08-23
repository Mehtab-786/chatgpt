const chatModel = require('../models/chat.model')

async function createChat(req, res) {
    const { content } = req.body

    const chat = await chatModel.create({
        content,
        user: req.user._id,
    })

    res.status(201).json({
        message: "chat created succesfully",
        chat: {
            _id: chat._id,
            title: chat.content,
            lastActity: chat.lastAcitivity
        }
    })
}

module.exports = {createChat}