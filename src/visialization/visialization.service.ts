import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { UserActivityService } from "../user-activity/user-activity.service";
import { addHours } from "date-fns";

@Injectable()
export class VisializationService {
  constructor(
    private readonly userService: UserService,
    private readonly userActivity: UserActivityService,
  ) {}

  async getVisiBrowsingData(userId: string) {
    const browsingData = await this.userActivity.fetchBrowsingData(userId);
    return browsingData
      .map(activity => {
        return {
          createdAt: addHours(activity.createdAt, 9),
          url: activity.data.url,
          title: activity.data.title,
          domain: activity.data.url && new URL(activity.data.url).host,
        };
      })
      .filter(activity => activity.url && activity.title);
  }

  async getVisiKeyData(userId: string) {
    const keyData = await this.userActivity.fetchNappData(userId);
    return keyData;
  }
}
