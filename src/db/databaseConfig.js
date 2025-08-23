const mongoose = require('mongoose')

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected')
    } catch (error) {
        console.log('Error while connecting to DB ', error )
    }
}

module.exports = connectToDB