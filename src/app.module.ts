import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PlaygroundModule } from "./playground/playground.module";

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
