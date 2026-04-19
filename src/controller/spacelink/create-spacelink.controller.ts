import type { Request, Response } from "express";
import { createSpaceLinkType } from "../../types/spacelink.types.js";
import { spaceLink } from "../../models/spacelink.js";
import { generateHash } from "../../utils/generateHash.js";
import { Content } from "../../models/content.js";


export const createSpaceController = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId
        const createSpacePayload = req.body

        const createSpacePayloadCheck = createSpaceLinkType.safeParse(createSpacePayload)
        if (!createSpacePayloadCheck.success) {
            return res.status(400).json({
                msg: "Invalid input",
            });
        }

        const { spaceTitle, contents, sharedWith = [], isPublic = false } = createSpacePayload

        const existingcontents = await Content.find({ '_id': contents })

        const contentTagIds = [...existingcontents.map(tag_id => tag_id._id)]

        const hashString = generateHash();


        const space = await spaceLink.create({
            spaceTitle: spaceTitle,
            hash: hashString,
            userId: userId,
            contents: contentTagIds,
            sharedWith: sharedWith,
            isPublic: isPublic,

        })
        const linkString = space.hash
        
        return res.status(200).json({
            msg: "workspace successfully created",
            linkString: linkString
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Server error"
        })

    }



}