import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { RoomController } from './room.controller';
import { CreateRoomService } from './create-room/create-room.service';
import { RoomSchema } from '../types/schemas/room.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'room',
        schema: RoomSchema
      }
    ])
  ],
  controllers: [RoomController],
  providers: [CreateRoomService]
})
export class RoomModule {}
