import express from "express";
import userModels from "../models/user.models";


export const SignUp = async (req: express.Request, res: express.Response)=>{
    try{
        const {userName, password} = req.body;

        if(!userName || !password){
            return res.status(400).json({message: "Username and password are required"})
        }
        
        const existingUser = await userModels.findOne({userName})

        if(existingUser){
            return res.status(400).json({message: "Username already exists"})
        }

        const newUser = new userModels({userName, password})
        await newUser.save();

        res.status(201).json({message: "User created successfully", user: newUser})
    }catch(err){
        res.status(500).json({message: "Internal Server Error"})
    }
    
    
    }

export const Login = async(req: express.Request, res: express.Response)=>{
    
    try{
      const {userName} = req.body;
        
        const user = await userModels.findOne({userName})
        console.log(user)

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json({message: "Login successful", user})

    }catch(err){
        res.status(500).json({message: "Internal Server Error"})
    }
}