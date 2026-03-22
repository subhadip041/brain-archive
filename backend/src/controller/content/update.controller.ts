import type { Request, Response } from "express";
import { Content } from "../../models/content.js";
import { updateContentType } from "../../types/content.types.js";
import { Tags } from "../../models/tag.js";
import { resolveTagIds } from "../../utils/tag.helper.js";

export const updateContentController = async (req: Request, res: Response) => {
    try {
        const updateContentPayload = req.body;
        const updateContentCheck = updateContentType.safeParse(updateContentPayload)
        if (!updateContentCheck.success) {
            return res.status(400).json({
                msg: "Bad Request"
            })

        }

        const { id, link, type, title, tags } = req.body
        const tagIds = await resolveTagIds(tags)

        const checkingContentAndUpdate = await Content.findByIdAndUpdate(
            id, {
            link: link,
            type: type,
            title: title,
            tags: tagIds
        }
        )

        if (!checkingContentAndUpdate) {
            return res.status(404).json({ message: 'Content not found' });
        }

        return res.status(200).json({
            msg: "content updated",
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Server error"
        })
    }


}