import express from "express";

import { addTask, getTaskProject, listTask, newTaskProject, readTask, removeTask, updateTask } from "../controller/task.controller";


const routerTask=express.Router();

routerTask.get("/task",listTask);
routerTask.get("/task/:id",readTask)
routerTask.post("/task",addTask)
routerTask.put("/task/:id",updateTask)
routerTask.delete("/task/:id",removeTask)



export default routerTask;