const userModel = require("../models/register-model.js")
const bcrypt = require("bcryptjs")

const register = async (req,res)=>{

    const {name,email,username,password} = req.body;

    try{

        const existEmail = await userModel.findOne({email});

        if(existEmail){
            res.status(400).json({message: "Email already exists"})
        }

        const newUser = await userModel.create({name,email,username,password});
        const token = await newUser.generateToken();

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict',
            expires: new Date(Date.now()+20*24*60*60*1000)
        }).json({message:"You have been registreed successfully"});
    }
    catch(error){
        console.error(error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
             res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
             res.status(401).json({ message: "Invalid credentials" });
        }

        // Passwords match, authentication successful
        const token = await user.generateToken();

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict',
            expires: new Date(Date.now()+20*24*60*60*1000)
        }).json({message:"Successfully logged in"});
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const logout = async (req,res)=>{
    res.cookie('token','',{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite: 'strict',
        expires: new Date(0)
    }).json({message:"Successfully logged out"});
}

const getProfile = async (req,res)=>{
    try{
        res.status(200).json(req.user)
    }
    catch(error){
        console.error(error);
    }
}



module.exports = {register,login,logout,getProfile}