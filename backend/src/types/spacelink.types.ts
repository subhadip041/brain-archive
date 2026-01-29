import { z } from "zod";

const objectId = z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId");

export const createSpaceLinkType = z.object({
  contents: z.array(objectId).min(1, "At least one content required"),
  sharedWith: z.array(objectId).optional(),
  isPublic: z.boolean().optional(),
});

