import  express  from "express";
import  mongoose  from "mongoose";
import morgan from "morgan";
import router from "./src/router/project.router";
import routerTask from "./src/router/task.router";
import routerUser from "./src/router/user.router";
const cors=require('cors')
const app=express()
mongoose
    .connect("mongodb://localhost:27017/angular")
    .then(()=>{console.log("kết nối db thành công")})
    .catch((error)=>{console.log("kết nối db thất bại",error)})
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use("/api",router)
app.use("/api",routerUser)
app.use("/api",routerTask)
app.listen(8080,()=>{console.log("kết nối server thành công")})