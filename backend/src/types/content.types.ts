import z from "zod"


export const ContentTypeEnum = z.enum([
  "image",
  "video",
  "youtube",
  "tweet",
  "audio",
]);

export const createContentType = z.object({
  link: z.string().url("Invalid URL").min(1, "Link is required"),
  type: ContentTypeEnum,
  title: z.string(),
  tags: z.array(z.string())
  
});
