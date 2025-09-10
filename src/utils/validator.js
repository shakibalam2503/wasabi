const validate =  require("validator")


const validator= function (data){
    const mandatory =["firstName","lastName","email","age","password"];
    const isAllowed= mandatory.every((k)=>Object.keys(data).includes(k));
    if(!isAllowed){
        throw new Error("Missing fields");
    }
    if(validate.isEmail(data.email)){
        throw new Error("Invalid Email");
    }
    if(validate.isStrongPassword(data.password)){
        throw new Error("Weak password !!!!!! please use strong password ")
    }
}
module.exports=validator;