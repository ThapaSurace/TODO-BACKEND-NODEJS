const mongoose = require("mongoose")

const connectDatabase = async () =>{
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URI)
        console.log(`Mongo connectes at ${connect.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDatabase