const jwt = require("jsonwebtoken");
const userModel = require("../models/register-model.js")

const authMiddleware = async (req,res,next)=>{

    // automatically credentials bata cookies lyaunxa
    const token = req.cookies.token;


    // check if user really exists or not 
    if(!token){
        console.log("Tokem not found");
        res.status(401).json({message:"Token not found"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findOne({email: decoded.email}).select({
            password:0
        })

        if(!user){
            console.log("User not found in the database");
            res.status(401).json({message:'INvalid token details'})
        }

        req.user = user;
        
        console.log("user is present ");
        // this will move the middleware to the authController to fetch back the data 
        next();
       
    }
    catch(error){
        console.error(error);
    }


    console.log("Cookies: ", req.cookies);
}

module.exports = authMiddleware

