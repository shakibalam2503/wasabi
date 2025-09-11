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

        req.body.password = await bcrypt.hash(password,10);

        
        const user=await User.create(req.body);
        
        // creating a jwt token

        const token= jwt.sign({_id:user._id,email:user.email,firstName:user.firstName},process.env.JWT_SECRET_KEY,{expiresIn: 3600});
        res.cookie("token",token,{maxAge:3600000});

        res.status(201).send("User created succefully!!!")
    }
    catch(err){
        res.status(400).send("err:"+err)
    }
}
const login= async function(req,res){
    try{
        const {email,password}=req.body;
        if(!email){
            throw new Error("Missing email");
        }
        if(!password){
            throw new Error("Missing password")
        }
        const find = await User.findOne({email});
        const passwordComapare= await bcrypt.compare(password,find.password);

        if(!find || !passwordComapare){
            throw new Error("Invalid credential");
        }
        const token= jwt.sign({_id:find.id,email:find.email,firstName:find.firstName},process.env.JWT_SECRET_KEY,{expiresIn:3600});
        res.cookie("token",token,{maxAge:3600*1000});
        res.status(200).send("log in successfully")
    }
    catch(err){
        res.status(401).send("err:"+err)
    }
}