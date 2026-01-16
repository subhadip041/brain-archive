import mongoose from "mongoose";
import { boolean, hash } from "zod";

const spaceLinkSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

export const spaceLink = mongoose.model('spaceLink',spaceLinkSchema)