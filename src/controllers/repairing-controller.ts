import express from "express";
import repairingModel from "../models/repairing.model";
import { error } from "node:console";

export const repairingItemEntry = async(req: express.Request, res: express.Response)=>{
    try{
        const {customerName, mobileNumber, itemName, issueDescription, repairStatus, repairCost, paymentStatus, receivedAt, completedAt} = req.body;

        if(!customerName || !mobileNumber || !itemName || !issueDescription){
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

            const responseData = {
                status: "SUCCESS",
                message: "New repairing entry created successfully",
                data: newRepairingEntry,
                meta:{}
            }

            res.status(201).json(responseData)
        }
    }catch(err){
        res.status(500).json({message: "Internal Server Error" ,error:err})
    }
}

export const getAllRepairingItems = async(req: express.Request, res: express.Response)=>{
    try{
        const getAllRepairingItems = await repairingModel.find();

        const responseData = {
            status: "SUCCESS",
            message: "All repairing items retrieved successfully",
            data: getAllRepairingItems,
            meta:{}
        }

        res.status(200).json(responseData)
    }catch(err){
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateRepairingEntry = async(req: express.Request, res: express.Response)=>{
    try{
        const {id} = req.params;
        const updatedData = req.body;

        const updatedEntry = await repairingModel.findByIdAndUpdate(id, updatedData, {
            returnDocument: "after",
            runValidators: true,
        })

        if(!updatedEntry){
            return res.status(404).json({message: "Repairing entry not found"})
        }

        const responseData = {
            status: "SUCCESS",
            message: "Repairing entry updated successfully",
            data: updatedEntry,
            meta:{}
        }

        res.status(200).json(responseData)
    }catch(err){
        res.status(500).json({message: err})
    }
}

export const findRepairingEntryById = async(req: express.Request, res: express.Response)=>{
    try{
        const {id} = req.params;

        const repairingEntry = await repairingModel.findById(id)

        if(!repairingEntry){
            return res.status(404).json({message: "Repairing entry not found"})
        }

        const responseData = {
            status: "SUCCESS",
            message: "Repairing entry retrieved successfully",
            data: repairingEntry,
            meta:{}
        }

        res.status(200).json(responseData)
    }catch(err){
        res.status(500).json({message: "Internal Server Error"})
    }
}
