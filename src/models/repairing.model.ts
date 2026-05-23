import mongoose from "mongoose";



const repairingSchema = new mongoose.Schema({


    customerName:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    itemName:{  
        type:String,
        required:true
    },
    issueDescription:{
        type:String,
        required:true
    },
    repairStatus:{
        type:String,
        enum:["pending","inprogress","completed"],
        default:"pending"
    },
    repairCost:{
        type:Number,
        required:false
    },
    paymentStatus:{
        type:String,
        enum:["unpaid","paid", "partiallypaid"],
        default:"unpaid"
    },
    receivedAt:{
        type:Date,
        required:false
    },
    completedAt:{
        type:Date,
        required:false
    }

})


export default mongoose.model('Repairing',repairingSchema)
