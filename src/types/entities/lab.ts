import { Document } from "mongoose";

export interface Lab extends Document {
  name: string;
  createdAt: Date;
}
