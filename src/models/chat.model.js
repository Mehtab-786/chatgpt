const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    lastAcitivity: {
        type: Date,
        default: Date.now
    }
})

const chatModel = mongoose.model('chat', chatSchema)

module.exports = chatModel