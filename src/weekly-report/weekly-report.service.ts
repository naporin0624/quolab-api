import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { UserActivityService } from "../user-activity/user-activity.service";
import { EnvDataService } from "../env-data/env-data.service";
import { User } from "../types/entities/user.interface";
import { LabService } from "../lab/lab.service";
import { MonipiService } from "../monipi/monipi.service";
import { subDays } from "date-fns";

@Injectable()
export class WeeklyReportService {
  constructor(
    private readonly userService: UserService,
    private readonly userActivityService: UserActivityService,
    private readonly envDataService: EnvDataService,
    private readonly labService: LabService,
    private readonly monipiService: MonipiService,
  ) {}

  async weeklyDataList(user: User) {
    const [startTime, endTime] = [new Date(), subDays(new Date(), 7)]

    const lab = await this.labService.findOne(user.labId);
    if (!lab) return {}
    const monipiList = await this.monipiService.findByLabId(lab._id);
    const browsingData = this.userActivityService.fetchBrowsingData(
      user._id,
      startTime,
      endTime
    );
    const nappData = this.userActivityService.fetchNappData(user._id, startTime, endTime);
    const envDataList = Promise.all(monipiList.map(monipi => this.envDataService.fetchEnvData(monipi._id, startTime, endTime))) 

    return {
      browsingData,
      nappData,
      envDataList
    };
  }
}
