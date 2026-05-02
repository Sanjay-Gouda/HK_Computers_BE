import mongoose from "mongoose";
import validator from "validator";

const newPurchaseSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        trim:true ,//remove whitespace
        validate(value:string){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email address')
            }
        }
    },
    phoneNumber:{
        type:String,
        required:true
    },
    itemName:{
        type:String,
        required:true
    },
    purchaseDate:{
        type:Date,
        required:true
    },
    serialNumber:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    totalCost:{
        type: Number,
        required:false
    },
    paidAmount:{
        type:Number,
        required:true
    },
    dueAmount:{
        type:Number,
        required:false
    }

},{timestamps:true})


newPurchaseSchema.pre('save', function(){
    this.totalCost = this.price * this.quantity;
})

newPurchaseSchema.pre('save', function(){
    if(this.paidAmount && this.totalCost){
        this.dueAmount = this.totalCost - this.paidAmount;
    }
})

 export default mongoose.model('purchase',newPurchaseSchema)   
