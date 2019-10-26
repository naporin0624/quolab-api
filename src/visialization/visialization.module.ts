import { Module } from "@nestjs/common";
import { VisializationService } from "./visialization.service";
import { UserModule } from "../user/user.module";
import { UserActivityModule } from "../user-activity/user-activity.module";
import { VisializationController } from "./visialization.controller";

@Module({
  imports: [UserModule, UserActivityModule],
  controllers: [VisializationController],
  providers: [VisializationService],
})
export class VisializationModule {}
