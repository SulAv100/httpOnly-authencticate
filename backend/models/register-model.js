const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userScheme = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    username:{
        type:String,
        require: true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})

userScheme.pre('save', async function(next){
    const user = this;

    if(!user.isModified("password")){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password,salt);
    user.password = hash_password;
    next();
})

userScheme.methods.generateToken =  function(){
    return jwt.sign({
            email: this.email
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"20d"
        }
)
    
}





const userModel = mongoose.model("Ktas", userScheme);

module.exports = userModel;