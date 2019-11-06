import { Controller, Get, Param, UseGuards, Request } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { UserActivityService } from "../user-activity/user-activity.service";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "../types/index";
import { WeeklyReportService } from './weekly-report.service';

@UseGuards(AuthGuard("jwt"))
@Controller("weekly-report")
export class WeeklyReportController {
  constructor(
    private readonly userService: UserService,
    private readonly weeklyReportService: WeeklyReportService,
  ) {}

  @Get()
  async index(
    @Request() req: RequestWithUser,
  ) {
    const user = await this.userService.findOne(req.user.email)
    return this.weeklyReportService.weeklyDataList(user);
  }
}
