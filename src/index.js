const express =require("express");
const main = require('./config/db');
const redisClient=require("./config/redis")
const cookieParser=require("cookie-parser");
require('dotenv').config()
const authRouter= require("./routes/userAuthentication")

const app =express();
app.use(express.json());
app.use(cookieParser());
app.use("/user",authRouter);
const initConnection=async()=>{
    try{
        await main();
        console.log("Connected with database successfully");
        await redisClient.connect();
        console.log("connected with redis server successfully");
        
        app.listen(process.env.PORT_NUMBER,()=>{
    console.log("listening on port :"+process.env.PORT_NUMBER);
    })

    }
    catch(err){
        console.log("Unexpected error occured:"+err)
    }
}
initConnection();