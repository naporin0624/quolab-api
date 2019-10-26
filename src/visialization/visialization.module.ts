import { Module } from "@nestjs/common";
import { VisializationService } from "./visialization.service";
import { UserModule } from "../user/user.module";
import { UserActivityModule } from "../user-activity/user-activity.module";

@Module({
  imports: [UserModule, UserActivityModule],
  providers: [VisializationService],
})
export class VisializationModule {}
