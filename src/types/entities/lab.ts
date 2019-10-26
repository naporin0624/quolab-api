import { Document } from "mongoose";

export interface Lab extends Document {
  name: string;
  labCode?: string;
  createdAt: Date;
}
