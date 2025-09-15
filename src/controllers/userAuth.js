const redisClient = require("../config/redis");
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
        req.body.role='user'
        
        const user=await User.create(req.body);
        
        // creating a jwt token

        const token= jwt.sign({_id:user._id,email:user.email,firstName:user.firstName,role:'user'},process.env.JWT_SECRET_KEY,{expiresIn: 3600});
        res.cookie("token",token,{maxAge:3600000});

        res.status(201).send("User created succefully!!!")
    }
    catch(err){
        res.status(400).send("err"+err)
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
        if(!find){
            res.status(400).json({"message":"invalid credintial"})
        }
        const passwordComapare= await bcrypt.compare(password,find.password);

        if(!passwordComapare){
            throw new Error("Invalid credential");
        }
        const token= jwt.sign({_id:find.id,email:find.email,firstName:find.firstName,role:find.role},process.env.JWT_SECRET_KEY,{expiresIn:3600});
        res.cookie("token",token,{maxAge:3600*1000});
        res.status(200).send("log in successfully")
    }
    catch(err){
        res.status(401).send("err:"+err)
    }
}
const logout = async (req,res)=>{
    //validate the token
    try{
    const {token}=req.cookies;
    const payload=jwt.decode(token)
    await redisClient.set(`token:${token}`,'BLocked');
    await redisClient.expireAt(`token:${token}`,payload.exp);
    res.cookie("token",null,{expires:new Date(Date.now())})
    res.status(201).send("log out successfully")
    }
    catch(err){
        res.send("err:"+err)
    }

}
const adminRegister=async (req,res)=>{
    try{
        // validate the data 
        validator(req.body);
        const {firstName,lastName,email,age,password} = req.body;
        
        //hash the password 

        req.body.password = await bcrypt.hash(password,10);
        
        
        const user=await User.create(req.body);
        
        // creating a jwt token

        

        res.status(201).send("User has been  created succefully!!!")
    }
    catch(err){
        res.status(400).send("err"+err)
    }
    
}
module.exports={register,login,logout,adminRegister};