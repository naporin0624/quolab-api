import * as mongoose from "mongoose";

export const LabSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now }
});
