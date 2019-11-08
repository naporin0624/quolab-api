import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserActivityData } from "../types/entities/userActivityData.interface";
import { subHours, subWeeks } from "date-fns";
export interface Category {
  survey: number;
  writing: number;
  implementation: number;
  break: number;
}

@Injectable()
export class UserActivityService {
  constructor(
    @InjectModel("user-activity")
    private readonly userActivityModel: Model<UserActivityData>,
  ) {}

  async fetchBrowsingData(
    userId: string,
    startTime = subHours(new Date(), 6),
    endTime = new Date(),
  ): Promise<UserActivityData[]> {
    return this.userActivityModel.aggregate([
      {
        $match: {
          activityName: "browsing",
          "data.url": { $ne: undefined },
          userId: userId,
          createdAt: {
            $gte: startTime,
            $lt: endTime,
          },
        },
      },
    ]);
  }

  async fetchNappData(
    userId: string,
    startTime = subHours(new Date(), 6),
    endTime = new Date(),
  ): Promise<UserActivityData[]> {
    return this.userActivityModel.aggregate([
      {
        $match: {
          activityName: "KeyCountAndAppName",
          userId: userId,
          createdAt: {
            $gte: startTime,
            $lt: endTime,
          },
        },
      },
    ]);
  }

  async fetchWeeklyCategories(userId: string) {
    const startTime = subWeeks(new Date(), 1);
    const endTime = new Date();

    const items: UserActivityData[] = await this.userActivityModel.aggregate([
      {
        $match: {
          userId: userId,
          category: { $ne: undefined },
          createdAt: {
            $gte: startTime,
            $lt: endTime,
          },
        },
      },
    ]);
    const categories = [
      "survey",
      "writing",
      "implementation",
      "break",
    ] as const;
    const categoryCount = categories.map(
      category => items.filter(item => item.category === category).length,
    );
    const data = categoryCount.map(
      c => (c * 100) / categoryCount.reduce((a, b) => a + b),
    );
    return {
      labels: categories,
      datasets: [
        {
          data,
        },
      ],
    };
  }
}
