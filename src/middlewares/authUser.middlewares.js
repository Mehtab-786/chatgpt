const  jwt = require("jsonwebtoken")
const userModel = require("../models/user.models")


async function authUser(req,res,next) {
    let token = req.cookies.token
    
    if (!token) {
        return res.status(400).json({
            message:"User not logged in"
        })
    }

    try {
        let decoded = jwt.verify(token,process.env.JWT_SECRET)
        let user = await userModel.findById(decoded.id)
        req.user = user
        next()
    } catch (err) {
        console.log('Error while authenticating', err)
    }   
}

module.exports = {authUser}