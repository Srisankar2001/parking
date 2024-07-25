const { default: mongoose } = require("mongoose")
const { User } = require("../model/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const securityKey = process.env.SECRET_KEY

const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Input all nessary" })
    }

    try {

        const existingUser = await User.findOne({ email: email })

        if (!existingUser) {
            return res.status(400).json({ success: false, message: "Email not registered" })
        }

        bcrypt.compare(password, existingUser.password, (err, match) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ success: false, message: "Internal server error. Dehashing error" })
            } else if (!match) {
                return res.status(200).json({ success: false, message: "Password is wrong" })
            } else {
                const payload = {
                    _id: existingUser._id
                }
                jwt.sign(payload, securityKey, { expiresIn: '1d' }, (err, token) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({ success: false, message: "Internal server error. Error in generating token" })
                    } else {
                        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
                        return res.status(200).json({ success: true, message: "Login Successfull" })
                    }
                })
            }
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." })
    }

}

const verify = (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({ success: false, message: "Token is expired. Login again" })
    }
    jwt.verify(token, securityKey, (err, decode) => {
        if (err) {
            res.clearCookie('token', { httpOnly: true })
            return res.status(400).json({ success: false, message: "Invalid Token" })
        } else {
            return res.status(200).json({ success: true, data: decode })
        }
    })
}

const logout = async(req,res)=>{
    res.clearCookie('token', { httpOnly: true })
    return res.status(200).json({ success: true, message: "Logout successfully" })
}

const authController = {
    login,
    verify,
    logout
}

module.exports = { authController }