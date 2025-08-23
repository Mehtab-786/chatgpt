const jwt = require('jsonwebtoken')
const userModel = require('../models/user.models')
const bcypt = require('bcryptjs')

async function userRegister(req, res) {
    const { email, password, fullName: { firstName, lastName } } = req.body

    const isUser = await userModel.findOne({ email })

    if (isUser) {
        return res.status(400).json({
            message: "Username or email taken"
        })
    }

    const hashedPassword = await bcypt.hash(password, 5)

    const user = await userModel.create({
        email,
        password: hashedPassword,
        fullName: {
            firstName,
            lastName
        }
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie('token', token)

    res.status(201).json({
        message: "User created succefully",
        user
    })

}


async function userLogin(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "User or password incorrect"
        })
    }

    const isPassword = await bcypt.compare(password, user.password)

    if (!isPassword) {
        return res.status(400).json({
            message: "User or password incorrect"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie('token', token)

    res.status(201).json({
        message: "User logged-in succefully",
        user
    })

}
module.exports = {userLogin, userRegister}