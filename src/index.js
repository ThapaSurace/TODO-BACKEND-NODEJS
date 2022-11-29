const express = require("express")
require("dotenv").config()
const app = express()
const connectDatabase = require("./database/dbConnect")

const PORT = process.env.PORT || 4500

// build in middleware for json data
app.use(express.json())

// build-in middlware for form data
app.use(express.urlencoded({extended: false}))


app.use('/rest/todos',require('./routes/todoRoutes'))
app.use('/rest/users',require('./routes/userRoutes'))

app.listen(PORT,()=>{
    connectDatabase()
    console.log(`Server starting at ${PORT}`)
})