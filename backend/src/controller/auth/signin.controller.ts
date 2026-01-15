import type { Request, Response } from "express";
import { signinSchema } from "../../types/auth.types.js";

export const signInController =(req: Request, res: Response)=>{
            const signInPayload = req.body;

}