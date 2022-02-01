const User = require("../models/User");
const ErrorHandler = require("../utils/errorResponse")
exports.register = async (req, res, next) => {
    const {username, email, password} = req.body
    try {
        const user = await User.create({
            username, email, password
        })
        // res.status(201).json({
        //     success: true,
        //     user
        // })
        sendToken(user,201,res)
    } catch (e) {
        next(e)
        // res.status(500).json({
        //     success: false,
        //     error: e.message
        // })
    }
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        // res.status(400).json({success:false, error: "Please provide email and password"})
        return next(new ErrorHandler("Please provide email and password", 400))
    }
    try {
        const user = await User.findOne({email}).select("+password")
        if (!user) {
            // res.status(400).json({success:false,error:"Invalid credentials"})
            return next(new ErrorHandler("Invalid credentials", 400))
        }
        const isMatch = await user.matchPasswords(password)
        if (!isMatch) {
            // res.status(404).json({success:false,error:"Invalid credentials"})
            return next(new ErrorHandler("Invalid credentials", 404))
        }
        // res.status(200).json({success: true, token: "NOTHAVENOW"})

        sendToken(user,200,res)
    } catch (e) {
        // res.status(500).json({success:false,error:e.message})
        return next(e)
    }
}

exports.forgotpassword = (req, res, next) => {
    res.send("Forgot Password Route")
}
exports.resetpassword = (req, res, next) => {
    res.send("Reset Password Route")
}

const sendToken = (user, statuscode, res) => {
    const token = user.getSignedToken()
    res.status(statuscode).json({
        success: true,
        token
    })
}