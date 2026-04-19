import type { Request, Response } from "express";
import { spaceLink } from "../../models/spacelink.js";
import { User } from "../../models/user.js";
import { shareType, hashType } from "../../types/spacelink.types.js";


export const shareSpaceController = async (req: Request, res: Response) => {
    try {

        const userId = (req as any).userId;
        const sharedUserEmail = req.body
        const linkParams = req.params
        const sharedUserTypeCheking = shareType.safeParse(sharedUserEmail)
        const linkspaceTypeCheking = hashType.safeParse(linkParams)


        if (!sharedUserTypeCheking.success || !linkspaceTypeCheking.success) {
            return res.status(400).json({
                msg: "Invalid input",
            });
        }

        const { email } = sharedUserTypeCheking.data
        const { link } = linkspaceTypeCheking.data;

        const findSpace = await spaceLink.findOne({ hash: link }).lean()
        if (!findSpace) {
            return res.status(404).json({ message: "Space not found" });
        }

        if (findSpace.userId.toString() !== userId) {
            return res.status(403).json({ message: "Not allowed" });
        }

        const spaceId = findSpace._id


        const finduserEmails = await User.find({
            "email": { $in: email },

        })

        if (!finduserEmails) {
            return res.status(403).json({ message: "User is not registered" });
        }

        const nonExistingUser = email.filter((sharedUserEmail: any) => !finduserEmails.includes(sharedUserEmail)).map((sharedUserEmail: any) => ({ sharedUserEmail: sharedUserEmail }))

        const userIds = [...finduserEmails.map(shareUser_id => shareUser_id._id)]


        const userUpdate = await spaceLink.findById(spaceId)

        if (userUpdate) {
            await spaceLink.updateOne(
                { _id: spaceId },
                {
                    $addToSet: {
                        sharedWith: { $each: userIds }
                    }
                }
            );
        }


        return res.status(200).json({
            msg: "Workspace Shared",
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Server error"
        })


    }







}