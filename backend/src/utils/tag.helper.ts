import { Types } from "mongoose";
import { Tags } from "../models/tag.js";

export const resolveTagIds = async (tags: string[]): Promise<Types.ObjectId[]> => {
    const existingTags = await Tags.find({ title: { $in: tags } });
    const existingTagTitles = existingTags.map(tag => tag.title);
    
    const newTags = tags
        .filter(tag => !existingTagTitles.includes(tag))
        .map(tag => ({ title: tag }));
    
    const createdTags = await Tags.insertMany(newTags);
    
    return [
        ...existingTags.map(tag => tag._id),
        ...createdTags.map(tag => tag._id)
    ];
}