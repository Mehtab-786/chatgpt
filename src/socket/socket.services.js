const cookie = require('cookie')
const { Server } = require("socket.io");
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.models')
const generateContent = require('../services/ai.services');
const messageModel = require('../models/message.model');

function socketServer(httpServer) {
    const io = new Server(httpServer, { /* options */ });



    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
        if (!cookies) {
            next(new Error("no token"))
        }

        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET)
            const user = await userModel.findById(decoded.id)
            socket.user = user
            next()
        } catch (error) {
            next(new Error("no token"))
        }
    });

    io.on("connection", (socket) => {
        socket.on('ai-message', async (messagePayload) => {

            await messageModel.create({
                content: messagePayload.content,
                user: socket.user._id,
                chat: messagePayload.chat,
                role: "user"
            })

            const chatHistory = await messageModel.find({ chat: messagePayload.chat })
            console.log(chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            }))

            const responseAi = await generateContent(chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            }))

            await messageModel.create({
                content: responseAi,
                user: socket.user._id,
                chat: messagePayload.chat,
                role: "model"
            })

            socket.emit('ai-response', {
                chat: messagePayload.chat,
                content: responseAi
            })
        })
    });

}

module.exports = socketServer