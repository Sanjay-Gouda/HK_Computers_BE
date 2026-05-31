import express from "express";
import userModels from "../models/user.models";

import jwt from "jsonwebtoken";


export const CheckSiteHealth = (req: express.Request, res: express.Response)=>{
    res.status(200).json({message: "Site is healthy"})
}

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
        

        if(!user){
            return res.status(404).json({ status: "FAILED", message: "User not found"})
        }

        if(user.password !== req.body.password){
            return res.status(200).json({ status: "FAILED", message: "Invalid password"})
        }
        
        if(user.password === req.body.password){

            /* CREATE A JWT TOKEN */
            const token = jwt.sign({userId: user._id}, 'kahsdaksdjhaksdhj')

            /* STORE IN A COOKIE     */
            res.cookie('token', token,{
                httpOnly: true,
                secure:true,
                sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            }) 

            const responseData={
                status: "SUCCESS",
                message: "Login successful",
                token: token,
            }

            res.status(200).json(responseData)

        }


    }catch(err){
        res.status(500).json({message: "Internal Server Error",error: err})
    }
}

export const Logout = async(req: express.Request, res: express.Response)=>{
    try{
        res.clearCookie('token');

        const responseData={
            status: "SUCCESS",
            message: "Logout successful",
            data: null,
            meta:{}
        }

        res.status(200).json(responseData)
    }catch(err){
        res.status(500).json({message: "Internal Server Error"})
    }
}

