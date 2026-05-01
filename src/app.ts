
import connectDB from "./config/database";
import express from "express";
import routes from "./routers/routes";
import cors from "cors";


const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable CORS

connectDB().then(()=>{
    console.log('Database connected successfully')
    app.listen( 8001,()=>{
    console.log('Server is listening at port 8001')
})}).catch((err)=>{
	console.error('Database connection error:', err)
})

	


app.use('/api',routes)