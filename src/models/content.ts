import mongoose from "mongoose";
import { string } from "zod";

enum contentType {
    IMAGE = 'image',
    VIDEO = 'video',
    YOUTUBE = 'youtube',
    TWEET = 'tweet',
    AUDIO = 'audio'

} 

const contentSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: Object.values(contentType)
    },
    title: {
        type: String,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }],
}, { timestamps: true })
export const Content = mongoose.model('Content', contentSchema)

