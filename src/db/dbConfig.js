const mongoose = require('mongoose')

async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected to db')
    } catch (err) {
        console.log('Connection error ', err)
    }
}

module.exports = dbConnect