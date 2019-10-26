import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';

import { Room } from '../../types/entities/room.interface';
import { RoomDto } from '../../types/dto/room.dto'
@Injectable()
export class CreateRoomService {
  constructor(@InjectModel("room") private readonly roomModel: Model<Room>) {}

  createRoom(roomDto: Partial<RoomDto>) {
    // TODO: ユーザーの所属研究室を自動で取得してあげる
    roomDto.labId = "5db3e3278ebf8524b1f28337"
    const createdRoom = new this.roomModel(roomDto);
    return createdRoom.save();
  }

}
