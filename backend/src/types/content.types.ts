import mongoose from "mongoose";
import z from "zod"


export const ContentTypeEnum = z.enum([
  "image",
  "video",
  "youtube",
  "tweet",
  "audio",
]);

export const contentIdType = z.string().refine(
  (val) => {
    return mongoose.Types.ObjectId.isValid(val);
  },
  {
    message: "Invalid ObjectId",
  }
);
export const createContentType = z.object({
  link: z.string().url("Invalid URL").min(1, "Link is required"),
  type: ContentTypeEnum,
  title: z.string(),
  tags: z.array(z.string())
  
});


export const updateContentType = z.object({
  id: contentIdType,
  link: z.string().url("Invalid URL").min(1, "Link is required"),
  type: ContentTypeEnum,
  title: z.string(),
  tags: z.array(z.string())
  
});
