import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EnvData } from "src/types/entities/envData.interface";
import { subHours } from "date-fns";

@Injectable()
export class EnvDataService {
  constructor(
    @InjectModel("env-data") private readonly envDataModel: Model<EnvData>,
  ) {}

  async fetchEnvData(
    monipiId: string,
    startTime = subHours(new Date(), 6),
    endTime = new Date(),
  ): Promise<EnvData[]> {
    return this.envDataModel.aggregate([
      {
        $match: {
          monipiId,
          createdAt: {
            $gte: startTime,
            $lt: endTime,
          },
        },
      },
    ]);
  }

  async registeredSensorNames(monipiId: string): Promise<string[]> {
    return this.envDataModel.aggregate([
      {
        $group: {
          _id: "$sensorName",
        },
      },
    ]);
  }

  async filterSensorData(
    monipiId: string,
    sensorName: string,
    startTime = subHours(new Date(), 6),
    endTime = new Date(),
  ): Promise<EnvData[]> {
    return this.envDataModel.aggregate([
      {
        $match: {
          monipiId,
          sensorName,
          createdAt: {
            $gte: startTime,
            $lt: endTime,
          },
        },
      },
    ]);
  }
}
