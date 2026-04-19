import type { Request, Response } from "express";
import { signupType } from "../../types/auth.types.js";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt"
import { generatejwtToken } from "../../utils/generateJwt.js";

export const signUpController = async (req: Request, res: Response) => {
    try {
        const signUpPayload = req.body;

        const signupPayloadChecking = signupType.safeParse(signUpPayload)

        if (!signupPayloadChecking.success) {
            return res.status(411).json({
                msg: signupPayloadChecking.error.issues[0]?.message ?? "Invalid input"
            })
        }

        const userExits = await User.findOne({ email: signUpPayload.email })

        if(userExits) {
            return res.status(403).json({
                msg: " User already exists with this email"
            })
        }

        const hashedPassword = await bcrypt.hash(signUpPayload.password, 10)

        const user = await User.create({
            fullname: signUpPayload.fullname,
            email: signUpPayload.email,
            password: hashedPassword
        })

       const token = generatejwtToken(user._id.toString()) 
        
       const userDetails = {
            id: user._id,
            name: user.fullname,
            email: user.email,
        }
        
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            msg: "User Created",
            user: userDetails
        })


    } catch (error) {

        console.log(error)
        return res.status(500).json({
            msg: "Server error"
        })

    }


}