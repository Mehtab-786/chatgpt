const { Schema, model } = require('mongoose')

const messageSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    role: {
        type:String,
        enum:["user","model","system"],
        default:"user"
    },
    chat:{
        type:Schema.Types.ObjectId,
        ref:'chat',
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
}, { timestamps: true })

const messageModel = model('message', messageSchema)

module.exports = messageModel