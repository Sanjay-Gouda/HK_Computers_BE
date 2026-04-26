
import connectDB from "./config/database";
import express from "express";
import routes from "./routers/routes";


const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

connectDB().then(()=>{
    console.log('Database connected successfully')
    app.listen( 8001,()=>{
    console.log('Server is listening at port 8001')
})}).catch((err)=>{
	console.error('Database connection error:', err)
})

	


app.use('/api',routes)