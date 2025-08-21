const userModel = require('../models/user.models')
const jwt = require('jsonwebtoken')

async function authUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(404).json({
            message: "User not authenticated"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)
        req.user = user
        next()
    } catch (error) {
        res.json({
            message: "User not authenticated"
        })
    }
}

module.exports = { authUser }