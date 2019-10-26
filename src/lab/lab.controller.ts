import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Delete,
} from "@nestjs/common";
import { LabDto } from "../types/dto/Lab.dto";
import { CreateLabService } from "./create-lab/create-lab.service";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../user/user.service";
import { User } from "src/types/entities/user.interface";
import { LabService } from "./lab.service";

@Controller("lab")
export class LabController {
  constructor(
    private readonly createLabService: CreateLabService,
    private readonly labService: LabService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard("jwt"))
  @Get()
  async index(@Request() res: any) {
    const userParams: User = res.user;
    const user = await this.userService.findOne(userParams.email);
    return this.labService.findOne(user.labId);
  }

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

  @UseGuards(AuthGuard("jwt"))
  @Delete()
  async delete(@Request() res: any) {
    const userParams: User = res.user;
    return await this.userService.leaveLab(userParams.email);
  }
}
