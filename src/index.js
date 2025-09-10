const express =require('express');
const main = require('./config/db');
const cookieParser=require("cookie-parser");
require('dotenv').config()


const app =express();
app.use(express.json());
app.use(cookieParser());
const initConnection=async()=>{
    try{
        await main();
        console.log("Connected with database successfully");
        app.listen(process.env.PORT_NUMBER,()=>{
    console.log("listening on port :"+process.env.PORT_NUMBER);
    })

    }
    catch(err){
        console.log("Unexpected error occured:"+err)
    }
}
initConnection();