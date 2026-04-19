import type { Request, Response } from "express";
import { createContentType } from "../../types/content.types.js";
import { Content } from "../../models/content.js";
import { Tags } from "../../models/tag.js";
import { resolveTagIds } from "../../utils/tag.helper.js";


export const createContentController = async (req: Request, res: Response) => {

    try {

        const createContentPayload = req.body;
        const userId = (req as any).userId
        const createContentPayloadCheck = createContentType.safeParse(createContentPayload)

        if (!createContentPayloadCheck.success) {
            return res.status(400).json({
                msg: "Bad Request"
            })
        }

        const { link, type, title, tags } = req.body

        const tagIds = await resolveTagIds(tags)
        // const existingTags = await Tags.find({
        //     title: { $in: tags }
        // })

        // const existingTagTitle = existingTags.map(tag => tag.title)

        // const newTags = tags.filter((tag: string) => !existingTagTitle.includes(tag)).map((tag: string) => ({ title: tag }))

        // const createTag = await Tags.insertMany(newTags)

        // const tagIds = [...existingTags.map(tag_id => tag_id._id), ...createTag.map(tag_id => tag_id._id)]
        // const tagTitle = [...existingTags.map(tag_id => tag_id.title), ...createTag.map(tag_id => tag_id.tagTitle)]



        const createContent = await Content.create({
            link: link,
            type: type,
            title: title,
            userId: userId,
            tags: tagIds
        })

        if (!createContent) {
            return res.status(404).json({
                msg: "something went wronog to create content",
            })
        }


        return res.status(200).json({
            msg: "new content created",
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Server error"
        })

    }

}
