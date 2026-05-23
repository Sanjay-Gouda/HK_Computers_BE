import express from "express";
import new_purchaseModel from "../models/newPurchase.model";
import isEmail from "validator/lib/isEmail";




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
