//MONGODB/MONGOOSE NO LONGER IN USE, WE ARE USING PRISMA TO TALK TO OUR POSTGRESQL DATABASE.
//THIS FILE IS HERE FOR REFACTOR REFERENCE ONLY.
//PLEASE REFER TO THE PRISMA-SCHEMA FILE FOR THE SCHEMA OF OUR DATABASE.

import mongoose, {model, models, Schema} from "mongoose";

const FollowerSchema = new Schema({
  source: {type:mongoose.Types.ObjectId, required:true},
  destination: {type:mongoose.Types.ObjectId, required:true},
});

const Follower = models?.Follower || model('Follower', FollowerSchema);

export default Follower;