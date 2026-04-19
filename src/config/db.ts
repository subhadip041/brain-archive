import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const dbUrl = process.env.DB_URL as string
export const dbConnection = async ()=>{
try {
    await mongoose.connect(dbUrl)
    console.log("db connected")
} catch (error) {
        console.log(`some error throw ${error}`)

}

}