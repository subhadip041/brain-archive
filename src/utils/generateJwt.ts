import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()
const jwtSecret = process.env.JWT_SECRET as string


export const generatejwtToken = (userId: string): string=>{

    const token = jwt.sign({ "userId": userId }, jwtSecret, { expiresIn: "7d" })
    return token
    
}