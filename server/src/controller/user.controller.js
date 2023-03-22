import User from "../models/user"
import Jwt from "jsonwebtoken"
import Task from "../models/task";
import Project from "../models/project";
export const listUser=async(req,res)=>{
    try {
        const user=await User.find();
        return res.status(200).json({
            user,
        })
    } catch (error) {
        return res.status(404).json({
            message:"không thể lấy danh sách user"
        });
    }
}
export const removeUser= async(req,res)=>{
    try {
        const id= req.params.id;
        const user=await User.findOneAndDelete({_id:id});
        return res.status(200).json({
            user,
            message:"xóa thành công"
        })
    } catch (error) {
        res.status(404).json({
            message:"xóa không thành công",
        })
    }
}
export const signup=async(req,res)=>{
    try {
        const body=req.body;
        const exisUser=await User.findOne({email:body.email})
        if(exisUser){
            return res.status(404).json({
                message:"email đã tồn tại"
            });
            
        }
        const user =await new User(body).save();
        return res.status(200).json({
            user,
        })
    } catch (error) {
        return res.status(404).json({
            message:"không thể thêm mới user"
        })
    }
}

export const signin =async(req,res)=>{
    try {
        const body=req.body;
        const user=await User.findOne({email:body.email});
        if(!user){
            return res.status(404).json({
                message:"email không tồn tại"
            });
        }
        const check=user.authenticate(body.password)

        if(!check){  // !check
            console.log(check)
            return res.status(404).json({
                message:"mật khẩu không chính xác"
            })
        }
        const token=Jwt.sign({_id:user._id},"123456")
        return res.status(200).json({
            user,
            token
        })
    } catch (error) {
        return res.status(404).json({
            message:"không thể đăng nhập",error
            
        })
    }
}

export const getUserTask =async(req,res)=>{
    try {
        const userId =req.params.id
        // const prId =req.params.idPr
        const user =await User.findOne({_id:userId}).populate("tasks")
        // const project =await Project.findOne({_id:prId}).populate("tasks")
        return res.status(200).json({
            tasks:user.tasks,
            // tasksPr:project.tasks
        })
    } catch (error) {
        
    }
}

export const newUserTask=async(req,res)=>{
    try {
        const userId =req.params.id
        const prId =req.params.idPr

        const newTask =new Task(req.body)

        const user =await User.findOne({_id:userId})
        const project =await Project.findOne({_id:prId})
        newTask.owner=user
        newTask.projectOwner=project

        await newTask.save()
        user.tasks.push(newTask._id)
        project.tasks.push(newTask._id)
        await user.save()
        await project.save()
        
        return res.status(200).json({
            task: newTask
        })
    } catch (error) {
        
    }
}