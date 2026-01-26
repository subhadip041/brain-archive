import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()
const jwtSecret = process.env.JWT_SECRET as string

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    const token = req.cookies['token']

    if(token == null){
        return res.status(403).json({
            msg:"Unauthorized"
        })
    }

    const decoded = jwt.verify(token, jwtSecret) as { userId: string };
    (req as any).userId = decoded.userId;

    next()

    } catch (error) {
         return res.status(500).json({ msg: "Authentication Error" });
    }

}