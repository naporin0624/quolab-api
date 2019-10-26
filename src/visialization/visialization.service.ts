import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { UserActivityService } from "../user-activity/user-activity.service";

@Injectable()
export class VisializationService {
  constructor(
    private readonly userService: UserService,
    private readonly userActivity: UserActivityService,
  ) {}
}
