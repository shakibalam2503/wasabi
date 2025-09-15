const express = require("express");
const {register,login,logout,adminRegister} = require("../controllers/userAuth")
const jwtValidator= require("../middleware/jwtValidator")
const adminMiddleware=require("../middleware/adminMiddleware")
const authRouter= express.Router();
// register 

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/logout",jwtValidator,logout)
authRouter.post("/admin/register",adminMiddleware,adminRegister)
//authRouter.get("/profile",profile)

module.exports= authRouter;