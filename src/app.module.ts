import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaygroundModule } from "./playground/playground.module";
import { LabModule } from "./lab/lab.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { RoomModule } from "./room/room.module";
import { EnvDataModule } from "./env-data/env-data.module";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { UserActivityModule } from "./user-activity/user-activity.module";
import { VisializationController } from './visialization/visialization.controller';
import { VisializationModule } from './visialization/visialization.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb://ds139768.mlab.com:39768/heroku_x69xrrcc",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        user: "heroku_x69xrrcc",
        pass: "khfa8gd1cleocbkqt5c7mt5d7u",
      },
    ),
    PlaygroundModule,
    LabModule,
    UserModule,
    AuthModule,
    RoomModule,
    EnvDataModule,
    UserActivityModule,
    VisializationModule,
  ],
  controllers: [AppController, VisializationController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("/*");
  }
}
