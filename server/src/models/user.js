import mongoose, { Schema } from "mongoose";
import {createHmac} from "crypto"
const userShema=mongoose.Schema({
    email:{
        type:String  
    },
    password:{
        type:String
    },
    name:{
        type:String
    },
    image:{
        type:String
    },
    team:{
        type:Number
    },
    tasks:[{
        type:Schema.Types.ObjectId,
        ref:"Task"
    }]

},{timestamps:true});
userShema.methods={
    authenticate(password){
        console.log(this.password)
        return this.password===this.ecryptPassword(password)
    },
    ecryptPassword(password){
        // console.log("pass", createHmac("sha256","123456").update(password).digest("hex"))
        if(!password) return "";
        // return createHmac("sha256","123456").update(password).digest("hex")
        return password;
    }
}
userShema.pre("save",function(next){
    console.log("pas",this.password)
    this.password=this.ecryptPassword(this.password)
    
    next()
})
export default mongoose.model("User",userShema);