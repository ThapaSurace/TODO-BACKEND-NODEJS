const mongoose = require("mongoose")
const User = mongoose.Schema

const userSchema = User({
    name:{
        type: String,
        required: [true,"Please add name"]
    },
    email:{
        type: String,
        required: [true,"Please add email"],
        unique:true
    },
    password:{
        type: String,
        required: [true,"Please add password"]
    },
    
},{timestamps:true})

module.exports = mongoose.model("USER",userSchema)