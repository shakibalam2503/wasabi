
const jwt= require("jsonwebtoken");
const User = require("../models/user");
const rediClient= require("../config/redis")
const jwtValidator= async (req,res,next)=>{
    try{
       const {token}=req.cookies;
       if(!token){
        throw new Error("Not a valid token");
       }
       const payload= jwt.verify(token,process.env.JWT_SECRET_KEY);
       const {_id}= payload;

       if(!_id){
        throw new Error("Invalid token")
       }
       const result =await User.findById({_id})
       if(!result){
        throw new Error("invalid token")
       }
       const isBlocked= await rediClient.exists(`token:${token}`)
       if(isBlocked){
             throw new Error("invalid token")
       }
       req.result=result;
       next()
    }

    catch(err){
        res.status(401).send("err:"+err)
    }
}
module.exports=jwtValidator