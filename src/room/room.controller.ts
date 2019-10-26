import { Controller, Post, Body } from '@nestjs/common';
import { CreateRoomService } from './create-room/create-room.service';
import { RoomDto } from '../types/dto/room.dto'
@Controller('room')
export class RoomController {
  constructor(private readonly createRoomService: CreateRoomService) {}

  // TODO: ログイン専用
  @Post()
  createRoom(@Body() roomDto: Partial<RoomDto>) {
    return this.createRoomService.createRoom(roomDto)
  }
}
