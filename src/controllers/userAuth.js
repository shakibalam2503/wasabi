const User= require("../models/user")
const validator= require("../utils/validator")
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const register = async(req,res)=>{
    try{
        // validate the data 
        validator(req.body);
        const {firstName,lastName,email,age,password} = req.body;
        
        //hash the password 

        req.body.password =await bcrypt.hash(password,10);

        
        await User.create(req.body);
        // creating a jwt token

        const token= jwt.sign({_id:User._id,email:User.email,firstName:User.firstName},process.env.JWT_SECRET_KEY,{expiresIn: 3600});
        res.cookies("token",token,{maxAge:3600000});

        res.status(201).send("User created succefully!!!")
    }
    catch(err){
        res.status(400).send("err:"+err)
    }
    
    
}