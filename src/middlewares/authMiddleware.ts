import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userModels from '../models/user.models';



export const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction      )=>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message: "Unauthorized"})
        }

        const decodedToken = jwt.verify(token, 'kahsdaksdjhaksdhj') as JwtPayload;
        const userId = decodedToken.userId; 
        const findUser = await userModels.findById(userId);

        if(!findUser){
            return res.status(401).json({message: "Unauthorized"})
        }
      (req as any).user = findUser; // Attach user information to the request object for further uses

        next();
    }catch(err){
        res.status(401).json({message: "Unauthorized" ,error:err})
    }
}