require("dotenv").config();
const express = require("express");
const router = require("./routes/register-route.js")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/db.js")


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));app.use(cookieParser());

app.use('/api/auth',router);
const URL = process.env.PORT ||3000;
connectDB();

app.listen(URL, ()=>{
    console.log("Server is currenlty running");
})


