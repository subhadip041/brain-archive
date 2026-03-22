import type { Request, Response } from "express";
import { Content } from "../../models/content.js";



export const getContentController = async (req: Request, res: Response) => {


    const userId = (req as any).userId
    const getContent = await Content.find({ userId: userId }).populate('tags', 'title').lean()

   // console.log(getContent)
    const response = getContent.map(content => ({
        id: content._id,
        type: content.type,
        link: content.link,
        title: content.title,
        tags: content.tags.map((tag: any) => tag.title),
    }));


    return res.status(200).json({
        content: response
    })
}