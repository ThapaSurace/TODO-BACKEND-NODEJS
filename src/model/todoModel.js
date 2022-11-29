const mongoose = require("mongoose")
const TODO = mongoose.Schema

const todoSchema = TODO({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"USER"
    },
    todo:{
       type: String,
       required: [true, "Please add todo"]
    }
},{timestamps:true})

module.exports = mongoose.model("TODO",todoSchema)