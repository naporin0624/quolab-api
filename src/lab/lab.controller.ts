import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { LabDto } from "../types/dto/Lab.dto";
import { CreateLabService } from "./create-lab/create-lab.service";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../user/user.service";
import { User } from "src/types/entities/user.interface";

@Controller("lab")
export class LabController {
  constructor(
    private readonly createLabService: CreateLabService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard("jwt"))
  @Post()
  async createLab(
    @Request() res: any,
    @Body() createLabRequestDto: Partial<LabDto>,
  ) {
    const user: User = res.user;
    console.log(res.user);
    const lab = await this.createLabService.createLab(createLabRequestDto);
    await this.userService.joinLab(user.email, lab._id);
    return lab;
  }
}
