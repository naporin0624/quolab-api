import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { CreateRoomService } from "./create-room/create-room.service";
import { RoomDto } from "../types/dto/room.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("room")
export class RoomController {
  constructor(private readonly createRoomService: CreateRoomService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post()
  createRoom(@Body() roomDto: Partial<RoomDto>) {
    return this.createRoomService.createRoom(roomDto);
  }
}
