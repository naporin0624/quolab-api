import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { LabDto } from "../types/dto/Lab.dto";
import { CreateLabService } from "./create-lab/create-lab.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("lab")
export class LabController {
  constructor(private readonly createLabService: CreateLabService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post()
  createLab(@Body() createLabRequestDto: Partial<LabDto>) {
    return this.createLabService.createLab(createLabRequestDto);
  }
}
