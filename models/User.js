//MONGODB/MONGOOSE NO LONGER IN USE, WE ARE USING PRISMA TO TALK TO OUR POSTGRESQL DATABASE.
//THIS FILE IS HERE FOR REFACTOR REFERENCE ONLY.
//PLEASE REFER TO THE PRISMA-SCHEMA FILE FOR THE SCHEMA OF OUR DATABASE.

import {model, models, Schema} from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  image: String,
  cover: String,
  bio: String,
  username: String,
});

const User = models?.User || model('User', UserSchema);

export default User;