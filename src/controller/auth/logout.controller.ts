import type { Request, Response } from "express";

export const logoutController = (req: Request, res: Response) => {

    res.cookie("token", "", {
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(0), 
    secure: process.env.NODE_ENV === "production",
  });

    return res.status(200).json({
        msg: "logout done"
    })


}