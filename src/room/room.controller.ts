import { Controller, Post, Body, UseGuards, Request, HttpStatus, HttpException } from "@nestjs/common";
import { CreateRoomService } from "./create-room/create-room.service";
import { UserService } from '../user/user.service'
import { RoomDto } from "../types/dto/room.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("room")
export class RoomController {
  constructor(private readonly createRoomService: CreateRoomService, private readonly userService: UserService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post()
  async createRoom(
    @Request() res: any,
    @Body() roomDto: Partial<RoomDto>) {
    const user = await this.userService.findOne(res.user.email)
    if (!user.labId) {
      throw new HttpException(
        `please join is lab`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.createRoomService.createRoom(roomDto, user);
  }
}
