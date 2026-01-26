import mongoose from "mongoose";

const spaceLinkSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    share: Boolean
})

export const spaceLink = mongoose.model('spaceLink',spaceLinkSchema)