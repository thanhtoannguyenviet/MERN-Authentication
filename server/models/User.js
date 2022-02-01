const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please provide a username"]
    },
    email:{
        type: String,
        required: [true,"Please provide a email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true,"Please provide a password"],

    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})
UserSchema.pre("save", async function (){
    if(!this.isModified("password")){
        return;
    }
    const salt = await  bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    return;
})
UserSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password,this.password)
}
UserSchema.methods.getSignedToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_TOKEN,{
        expiresIn:process.env.JWT_EXPIRED})
}
const User = mongoose.model("User",UserSchema,"User")

module.exports = User