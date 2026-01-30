import mongoose from "mongoose";

const spaceLinkSchema = new mongoose.Schema({
    spaceTitle: { type: String, required: true },
    hash: { type: String, unique: true, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content',default: [] }],
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User',default: [] }],
    isPublic: { type: Boolean, default: false }
}, { timestamps: true })

export const spaceLink = mongoose.model('spaceLink', spaceLinkSchema)