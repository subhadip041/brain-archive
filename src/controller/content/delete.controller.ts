import type { Request, Response } from "express";
import { Content } from "../../models/content.js";
import { deleteContentType } from "../../types/content.types.js";


export const deleteContentController = async (req: Request, res: Response) => {
    try {
        const deletePayload = req.body
        const deletePayloadCheck = deleteContentType.safeParse(deletePayload)
        const userId = (req as any).userId

        if (!deletePayloadCheck.success) {
            return res.status(400).json({
                msg: "Bad Request"
            })
        }

        const { id } = req.body

        const deletedItem = await Content.findOneAndDelete({
            _id: id,
            userId: userId
        })
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        return res.status(200).json({
            msg: "content deleted",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Server error"
        })
    }
}