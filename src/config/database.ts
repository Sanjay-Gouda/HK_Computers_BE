import mongoose from "mongoose";

const connectDB = async ()=>{
    await mongoose.connect('mongodb://localhost:27017/HK_Computers_Inverntory_Dashboard')
}


export default connectDB;
