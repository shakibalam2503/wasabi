const mongoose=require('mongoose')
const {Schema}=mongoose;
const userSchema= new Schema ({
    firstName:{
        type:String,
        require:true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        require:true,
        minLength:3,
        maxLength:20
    }
    ,
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        immuatable:true
    },
    age:{
        type:Number,
        min:6,
        max:80,
        require:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    problemSolved:{
        type:[String]
    }
    
},
{
    timestamps:true
})
const User=mongoose.model("users",userSchema);
module.exports=User;