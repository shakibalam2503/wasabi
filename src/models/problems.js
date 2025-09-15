const mongoose=require("mongoose")
const {Schema}= mongoose
const problemSchema= new Schema({
    title:{
        type:String,
        required:true,
        minLength:10,
        maxLength:100
    },
    description:{
        type:String,

    },
    difficulty:{
        type:String,
        enum:['Easy',',Medium','Hard','Very Hard'],
        required:true

    },
    tags:{
        type:String,
        enum:['Array','Dp','Grapah','Tree','Reccursion','Greedy','Linked List'],
        required:true
    },
    visibleTestCase:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            },
            explaination:{
                type:String,
                required:true
            }
        }
    ],
    inVisibleTestCase:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            },
        }
    ],
    initialTestCase:[
        {
            language:{
                type:String,
                requried:true
            },
            startCode:{
                type:String,
                required:true
            }
        }
    ],
    problemCreator:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true,

    }

},
{
    timestamps:true
});
const problem= mongoose.model("problems",problemSchema);
module.exports=problem;
