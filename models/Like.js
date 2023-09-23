//MONGODB/MONGOOSE NO LONGER IN USE, WE ARE USING PRISMA TO TALK TO OUR POSTGRESQL DATABASE.
//THIS FILE IS HERE FOR REFACTOR REFERENCE ONLY.
//PLEASE REFER TO THE PRISMA-SCHEMA FILE FOR THE SCHEMA OF OUR DATABASE.

import mongoose, {model, models, Schema} from "mongoose";

const LikeSchema = new Schema({
  author: {type:mongoose.Types.ObjectId, ref: 'User'},
  post: {type:mongoose.Types.ObjectId, ref: 'Post'},
}, {
  timestamps: true,
});

const Like = models?.Like || model('Like', LikeSchema);

export default Like;