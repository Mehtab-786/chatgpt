const { Server } = require("socket.io");
const cookie = require('cookie');
const jwt = require("jsonwebtoken");
const { generateContent, generateVectors } = require('../services/ai.services')
const userModel = require("../models/user.models");
const messageModel = require("../models/message.model");
const {createMemory, queryMemory} = require('../services/vector.services')

async function socketServer(httpServer) {

    const io = new Server(httpServer, {});

    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

        if (!cookies) {
            return next(new Error('user not authenticated'))
        }

        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET)
            const user = await userModel.findById(decoded.id)
            socket.user = user
            next()
        } catch (error) {
            next(new Error('user not authenticated'))
            console.log('Error in middlewares in socket', error)
        }

    });

    io.on("connection", (socket) => {

        socket.on('ai-message', async (messagePayload) => {

            const message =  await messageModel.create({
                chat: messagePayload.chat,
                user: socket.user._id,
                role: "user",
                content: messagePayload.content
            })

            const vectors =  await generateVectors(messagePayload.content)

            const memory = await queryMemory({
                queryVectors:vectors,
                limit:3,
                metadata:{
                    user:socket.user._id
                }
            })

            await createMemory({
                messageId:message._id,
                metadata:{
                    chat:messagePayload.chat,
                    user:socket.user._id,
                    content:messagePayload.content
                }
            })
            
            
            const chatHistory = (await messageModel.find({
                chat: messagePayload.chat
            }).sort({ createdAt: -1 }).limit(4).lean()).reverse()
            
            const resp = await generateContent(chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            }))

            const aiResponse =  await messageModel.create({
                chat: messagePayload.chat,
                user: socket.user._id,
                role: "user",
                content: resp
            })

            const responseVectors =  await generateVectors(resp)

            await createMemory({
                messageId:message._id,
                metadata:{
                    chat:messagePayload.chat,
                    user:socket.user._id,
                    content:resp
                }
            })


            socket.emit('ai-response', {
                content: resp,
                chat: messagePayload.chat
            })

        })
    });
}

module.exports = { socketServer }