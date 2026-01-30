import type { Request, Response } from "express";
import { spaceLink } from "../../models/spacelink.js";
import { hashType } from "../../types/spacelink.types.js";



export const getLinkController = async (req: Request, res: Response) => {
  try {
    const linkParams = req.params

    const paramTypecheck = hashType.safeParse(linkParams)
    
    if (!paramTypecheck.success) {
      return res.status(400).json({ msg: "parsed error" });
    }

    const { link } = paramTypecheck.data;

    const getSpace = await spaceLink
      .findOne({ hash: link })
      .lean();

    if (!getSpace) {
      return res.status(404).json({
        message: "Space link not found",
      });
    }

    const linkResponse = {
      spaceTitle: getSpace.spaceTitle,
      link: getSpace.hash,
      contents: getSpace.contents,
      sharedWith: getSpace.sharedWith,
      isPublic: getSpace.isPublic,
      createdAt: getSpace.createdAt
    }


    return res.status(200).json({
      linkResponse
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: "Server error"
    })
  }
}



