import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomController } from "./room.controller";
import { CreateRoomService } from "./create-room/create-room.service";
import { RoomSchema } from "../types/schemas/room.schemas";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "room",
        schema: RoomSchema,
      },
    ]),
    UserModule
  ],
  controllers: [RoomController],
  providers: [CreateRoomService],
})
export class RoomModule {}
