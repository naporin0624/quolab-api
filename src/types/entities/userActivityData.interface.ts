import { Document } from "mongoose";

export interface UserActivityData extends Document {
  _id: string;
  userId: string;
  activityName: string;
  data: Object;
  createdAt: Date;
}
