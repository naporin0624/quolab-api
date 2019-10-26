import { Document } from "mongoose";

export interface User extends Document {
  _id: string;
  name: string;
  password: string;

  createdAt: Date;
}
