
import Task from "../models/task"
import Project from "../models/project";
export const listTask =async(req,res)=>{
    try {
        const task=await Task.find();
        return res.status(200).json({
            task,
        })
    } catch (error) {
        res.status(400).json({
            message:"list không thành công thành công",
        })
        
    }
}
export const readTask =async(req,res)=>{
    try {
        const id=req.params.id;
        const task=await Task.findOne({_id:id});
        return res.status(200).json({
            task
        })
    } catch (error) {
        res.status(400).json({
            message:"task not found",
        })
    }
}

export const addTask = async(req,res)=>{
    try {
        const body=req.body;
        const task=await new Task(body).save();
        return res.status(200).json({
            task,
            message:"add thành công"
        })
    } catch (error) {
        res.status(404).json({
            message:"add không thành công",
        })
    }
}
export const updateTask= async(req,res)=>{
    try {
        const body=req.body;
        const id= req.params.id;
        const task=await Task.findOneAndUpdate({_id:id},body,{new:true});
        return res.status(200).json({
            task,
            message:"update thành công",
        })
    } catch (error) {
        res.status(404).json({
            message:"update không thành công",
        })
    }
}

export const removeTask= async(req,res)=>{
    try {
        const id= req.params.id;
        const task=await Task.findOneAndDelete({_id:id});
        return res.status(200).json({
            task,
            message:"xóa thành công"
        })
    } catch (error) {
        res.status(404).json({
            message:"xóa không thành công",
        })
    }
}


