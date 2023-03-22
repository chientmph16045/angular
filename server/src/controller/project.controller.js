import Task from "../models/task";
import Project from "../models/project";

export const list =async(req,res)=>{
    try {
        const project=await Project.find();
        return res.status(200).json({
            project,
        })
    } catch (error) {
        res.status(400).json({
            message:"list không thành công thành công",
        })
        
    }
}
export const read =async(req,res)=>{
    try {
        const id=req.params.id;
        const project=await Project.findOne({_id:id});
        return res.status(200).json({
            project
        })
    } catch (error) {
        res.status(400).json({
            message:"project not found",
        })
    }
}

export const add= async(req,res)=>{
    try {
        const body=req.body;
        const project=await new Project(body).save();
        return res.status(200).json({
            project,
            message:"add thành công"
        })
    } catch (error) {
        res.status(404).json({
            message:"add không thành công",
        })
    }
}
export const update= async(req,res)=>{
    try {
        const body=req.body;
        const id= req.params.id;
        const project=await Project.findOneAndUpdate({_id:id},body,{new:true});
        return res.status(200).json({
            project,
            message:"update thành công",
        })
    } catch (error) {
        res.status(404).json({
            message:"update không thành công",
        })
    }
}

export const remove= async(req,res)=>{
    try {
        const id= req.params.id;
        const project=await Project.findOneAndDelete({_id:id});
        return res.status(200).json({
            project,
            message:"xóa thành công"
        })
    } catch (error) {
        res.status(404).json({
            message:"xóa không thành công",
        })
    }
}


export const getTaskProject =async(req,res)=>{
    try {
        const prId =req.params.id
        const task =await Task.findOne({_id:prId}).populate("projectOwner")
        return res.status(200).json({
            tasks:task.projectOwner
        })
    } catch (error) {
        
    }
}

// export const newTaskProject=async(req,res)=>{
//     try {
//         const prId =req.params.id
//         const newTask =new Task(req.body)

//         const project =await Project.findOne({_id:prId})
        
//         newTask.projectOwner=project
//         console.log(  newTask.projectOwner)
//         await newTask.save()

//         project.tasks.push(newTask._id)
//         await project.save()
        
//         return res.status(200).json({
//             task: newTask
//         })
//     } catch (error) {
        
//     }
// }