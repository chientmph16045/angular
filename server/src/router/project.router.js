import express  from "express";
import { add, getTaskProject, list, newTaskProject, read, remove, update } from "../controller/project.controller";

const router=express.Router();

router.get("/project",list);
router.get("/project/:id",read)
router.post("/project",add)
router.put("/project/:id",update)
router.delete("/project/:id",remove)

router.get("/:id/taskprojects",getTaskProject)
// router.post("/:id/taskprojects",newTaskProject)
export default router;