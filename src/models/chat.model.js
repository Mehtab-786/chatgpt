const { Schema, model } = require('mongoose')

const chatSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    lastActivity: {
        type: Date,
        default: Date.now
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
}, { timestamps: true })

const chatModel = model('chat', chatSchema)

module.exports = chatModel