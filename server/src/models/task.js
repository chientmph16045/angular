import mongoose, { Schema } from "mongoose";

const taskShema=mongoose.Schema({
    taskName:{
        type:String        
    },
    description:{
        type:String
    },
    team:{
        type:Number
    },
    date:{
        type:String
    },
    owner:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    projectOwner:[{
        type:Schema.Types.ObjectId,
        ref:"Project"
    }]
})
export default mongoose.model("Task",taskShema);