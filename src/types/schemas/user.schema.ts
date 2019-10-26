import { Schema } from "mongoose";

export const UserSchema = new Schema({
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});
