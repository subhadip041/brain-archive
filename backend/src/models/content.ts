import mongoose from "mongoose";

enum contentType {
  IMAGE = 'image',
  VIDEO = 'video',
  YOUTUBE = 'youtube',
  TWEET = 'tweet',
  AUDIO =   'audio'

}

const contentSchema = new mongoose.Schema({
    link:{
        type: String,
        required:true
    },
    type:{
        type: String,
        enum: Object.values(contentType)
    },
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    tags: {type: mongoose.Schema.Types.ObjectId, ref: 'Tags'}

})
export const Content = mongoose.model('Content',contentSchema)

 