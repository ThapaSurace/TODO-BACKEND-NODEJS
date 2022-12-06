const jwt = require("jsonwebtoken")
const USER = require("../model/userModel")

const privateRoute = async (req,res,next) => {
  let authToken;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
        authToken = req.headers.authorization.split(' ')[1]

        // verify jwt token
        const decodedToken = jwt.verify(authToken,process.env.JWT_SECRET)

        // get the user data from jwt token
        req.user = await USER.findById(decodedToken.id).select("-password")
        next()
    } catch (error) {
        res.status(401).json({message:"Unauthorized"})
    }
  }
  if(!authToken){
    res.status(401).json({message:"Please add token"})
  }
  
}

module.exports = {privateRoute}