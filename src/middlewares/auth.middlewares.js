const jwt = require('jsonwebtoken')
const userModel = require('../models/user.models')

async function authUser(req,res,next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({
            message:"User not authenticated"
        })
    }

    try {
        const decoded =  jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)
        req.user = user
        next()
    } catch (error) {
        return res.status(400).json({
            message:"User not authenticated"
        })
    }
}
module.exports = {authUser}