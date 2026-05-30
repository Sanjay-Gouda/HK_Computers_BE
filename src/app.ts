
import connectDB from "./config/database";
import express from "express";
import routes from "./routers/routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors(
    {
        origin: ["http://localhost:3000", "https://hk-computers-fe.vercel.app"], // Replace with your frontend URL
        credentials: true, // Allow cookies to be sent with requests
    }
)); // Middleware to enable CORS
app.use(cookieParser()) // Middleware to parse cookies

connectDB().then(()=>{
    console.log('Database connected successfully')
    app.listen(  process.env.PORT || 8001,()=>{
    console.log('Server is listening at port 8001')
})}).catch((err)=>{
	console.error('Database connection error:', err)
})

	


app.use('/api',routes)