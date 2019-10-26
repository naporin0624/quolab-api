import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserActivityData } from "src/types/entities/userActivityData.interface";

@Injectable()
export class UserActivityService {
  constructor(
    @InjectModel("user-activity")
    private readonly userActivityModel: Model<UserActivityData>,
  ) {}
}
