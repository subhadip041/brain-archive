import type { Request, Response } from "express";
import { signinType } from "../../types/auth.types.js";
import { User } from "../../models/user.js";
import bcrypt from "bcrypt"
import { generatejwtToken } from "../../utils/generateJwt.js";

export const signInController = async (req: Request, res: Response)=>{
 try {
        const signInPayload = req.body;

        const signinPayloadChecking = signinType.safeParse(signInPayload)

        if (!signinPayloadChecking.success) {
            return res.status(411).json({
                msg: signinPayloadChecking.error.issues[0]?.message ?? "Invalid input"
            })
        }

        const userExits = await User.findOne({ email: signInPayload.email })

        if(!userExits) {
            return res.status(403).json({
                msg: "User Not found"
            })
        }
        
        const hashedPassword = userExits.password
        const isMatch = await bcrypt.compare(signInPayload.password, hashedPassword);

        if(!isMatch) {
            return res.status(403).json({
                msg: "wrong password"
            })
        }

        const token = generatejwtToken(userExits._id.toString()) 

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            msg: "Login done"
        })


    } catch (error) {

        console.log(error)
        return res.status(500).json({
            msg: "Server error"
        })

    }
}