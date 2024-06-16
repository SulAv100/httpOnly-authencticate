const mongoose = require("mongoose");

const URI = process.env.DB

const connectDB = async()=>{
    try{
        await mongoose.connect(URI);
        console.log("Connection with database made successfully");
    }
    catch(error){
        console.error(error);
    }
}

module.exports = connectDB;