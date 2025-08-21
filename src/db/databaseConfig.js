const mongoose = require('mongoose')

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected to db')        
    } catch (err) {
        console.log('Error while connecting db', err)
    }
}

module.exports = connectToDb