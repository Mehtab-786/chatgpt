const bcrypt = require('bcryptjs')
const userModel = require('../models/user.models')
const jwt  = require('jsonwebtoken')

async function authRegister(req, res) {
    const { email, fullName: { firstName, lastName }, password } = req.body

    const isUser = await userModel.findOne({ email })

    if (isUser) {
        return res.status(400).json({
            message: "Username taken"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        email,
        password: hashedPassword,
        fullName: { firstName, lastName }
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie('token', token)

    return res.status(201).json({
        message: "User successfully registered",
        user
    })
}

async function authLogin(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message: "Username or pasword incorrect"
        })
    }

    const isPassword = await bcrypt.compare(password, user.password)

    if (!isPassword) {
        return res.status(400).json({
            message: "Username or pasword incorrect"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.cookie('token', token)

    return res.status(201).json({
        message: "User successfully logged-in",
        user,
    })
}

module.exports = {authLogin, authRegister}