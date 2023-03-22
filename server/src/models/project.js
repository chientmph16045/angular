import mongoose, { Schema } from "mongoose";

const projectShema=mongoose.Schema({
    name:{
        type:String        
    },
    description:{
        type:String
    },
    date:{
        type:String
    },
    size:{
        type:Number
    },
    tasks:[{
        type:Schema.Types.ObjectId,
        ref:"Task"
    }]
})
export default mongoose.model("Project",projectShema);