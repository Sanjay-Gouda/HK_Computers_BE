import express from "express";
import userModels from "../models/user.models";
import isEmail from "validator/lib/isEmail";
import new_purchaseModel from "../models/newPurchase.model";
import repairingModel from "../models/repairing.model";
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
            return res.status(404).json({message: "User not found"})
        }
        
        if(user.password === req.body.password){

            /* CREATE A JWT TOKEN */
            const token = jwt.sign({userId: user._id}, 'kahsdaksdjhaksdhj')

            /* STORE IN A COOKIE     */
            res.cookie('token', token) 
            res.status(200).json({message: "Login successful", user})

        }


    }catch(err){
        res.status(500).json({message: "Internal Server Error"})
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

export const newPurchaseEntry = async(req: express.Request, res: express.Response)=>{
    try{

        const {firstName, lastName, email, phoneNumber, itemName, purchaseDate, serialNumber, price, quantity , paidAmount} = req.body;

        const existingSerialNumber = await new_purchaseModel.findOne({serialNumber})

            if(!firstName || !lastName || !email || !phoneNumber || !itemName || !purchaseDate || !serialNumber || !price || !quantity || !paidAmount){
                return res.status(400).json({message: "All fields are required"})
            }else if(isEmail(email) === false){
                return res.status(400).json({message: "Invalid email address"})
            } else if(existingSerialNumber){
                return res.status(400).json({message: "Serial number already exists"})

            } else{

                const newPurchase = new new_purchaseModel({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    itemName,
                    purchaseDate,
                    serialNumber,
                    price,
                    quantity, 
                    paidAmount,
                })
                

                await newPurchase.save();

                const responseData = {
                    status: "SUCCESS",
                    message: "New purchase entry created successfully",
                    data: newPurchase,
                    meta:{}
                }
                
                res.status(201).json(responseData)
            }


    }catch(err){
        console.log(err , )
        res.status(500).json({message: "Internal Server Errorssss"})
    }
}



export const getAllNewPurchaseItems = async(req: express.Request, res: express.Response)=>{
    try{
       
        const getAllNewPurchaseItems = await new_purchaseModel.find();
        const responseData = {
            status: "SUCCESS",
            message: "All purchase items retrieved successfully",
            data: getAllNewPurchaseItems,
            meta:{}
        }

        res.status(200).json(responseData)

    }catch(err){
        res.status(500).json({message: err})
    }
}

export const updatePurchaseEntry = async(req: express.Request, res: express.Response)=>{

    try{
        const {id} = req.params;
        const updatedData = req.body;

        const updatedEntry = await new_purchaseModel.findByIdAndUpdate(id,updatedData,{
            returnDocument: "after",
      runValidators: true,
        })

        const responseData = {
            status:'SUCCESS',
            message: "Purchase entry updated successfully",
            data: updatedEntry,
            meta:{}
        }

        res.status(200).json(responseData)

    }catch(err){
        res.status(500).json({message: err})
    }
}

export const findPurchaseEntryById = async(req: express.Request, res: express.Response)=>{

    try{
        const {id} = req.params;

        const purchaseEntry = await new_purchaseModel.findById(id)

        if(!purchaseEntry){
            return res.status(404).json({message: "Purchase entry not found"})
        }

        const responseData = {
            status: "SUCCESS",
            message: "Purchase entry retrieved successfully",
            data: purchaseEntry,
            meta:{}
        }

        res.status(200).json(responseData)
    }catch(err){
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const repairingItemEntry = async(req: express.Request, res: express.Response)=>{

    try{
        const {customerName, mobileNumber, itemName, issueDescription, repairStatus, repairCost, paymentStatus, receivedAt, completedAt} = req.body

        if(!customerName || !mobileNumber || !itemName || !issueDescription || !repairStatus || !paymentStatus || !receivedAt || !completedAt || !repairCost){
            return res.status(400).json({message: "All fields are required"})
        }else{

            const newRepairingEntry = new repairingModel({
                customerName,
                mobileNumber,
                itemName,
                issueDescription,       
                repairStatus,
                repairCost,
                paymentStatus,
                receivedAt,
                completedAt
            })
            await newRepairingEntry.save();
            res.status(201).json({message: "New repairing entry created successfully", newRepairingEntry})
        }


    }catch(err){
        res.status(500).json({message: "Internal Server Error"})
    }


}

export const getAllRepairingItems = async(req: express.Request, res: express.Response)=>{

    try{
        const getAllRepairingItems = await repairingModel.find();

        res.status(200).json({message: "All repairing items retrieved successfully", getAllRepairingItems})
    }catch(err){
        res.status(500).json({message: "Internal Server Error"})
    }

}