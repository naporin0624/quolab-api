import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { EnvDataController } from "./env-data.controller";
import { PostDataService } from "./post-data/post-data.service";
import { EnvDataSchema } from "../types/schemas/env_data.schemas";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "env-data",
        schema: EnvDataSchema,
      },
    ]),
  ],
  controllers: [EnvDataController],
  providers: [PostDataService],
})
export class EnvDataModule {}
