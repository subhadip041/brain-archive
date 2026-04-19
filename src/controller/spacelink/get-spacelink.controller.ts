import type { Request, Response } from "express";
import { spaceLink } from "../../models/spacelink.js";


export const getSpaceController = async (req: Request, res: Response) => {

    try {

        const userId = (req as any).userId

        const getSpace = await spaceLink.find({ userId: userId })
        const spaceResponse = getSpace.map((space) => ({
            spaceTitle: space.spaceTitle,
            link: space.hash,
            isPublic: space.isPublic,
            sharedWith: space.sharedWith,
            createdAt: space.createdAt,
        }
        ))
        console.log(spaceResponse)

        return res.status(200).json({
            "spaceLink": spaceResponse
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Server error"
        })
    }






}

