//MONGODB/MONGOOSE NO LONGER IN USE, WE ARE USING PRISMA TO TALK TO OUR POSTGRESQL DATABASE.
//THIS FILE IS HERE FOR REFACTOR REFERENCE ONLY.
//PLEASE REFER TO THE PRISMA-SCHEMA FILE FOR THE SCHEMA OF OUR DATABASE.

import mongoose, {model, models, Schema} from "mongoose";

const PostSchema = new Schema({
  author: {type:mongoose.Types.ObjectId, ref: 'User'},
  text: String,
  likesCount: {type:Number,default:0},
  commentsCount: {type:Number,default:0},
  parent: {type:mongoose.Types.ObjectId, ref: 'Post'},
  images: {type:[String]},
}, {
  timestamps: true,
});

const Post = models?.Post || model('Post', PostSchema);
export default Post;