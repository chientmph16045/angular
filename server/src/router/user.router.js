import express from "express"
import {  getUserTask, listUser,  newUserTask, removeUser, signin, signup } from "../controller/user.controller"

const routerUser=express.Router()

routerUser.post("/signin",signin)
routerUser.post("/signup",signup)
routerUser.get("/getUser",listUser)
routerUser.delete("/deleteUser/:id",removeUser)
// quản lý task
routerUser.get("/:id/tasks",getUserTask)
routerUser.post("/:id/:idPr/tasks",newUserTask)
export default routerUser