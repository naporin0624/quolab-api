import { Controller, Post, Body } from "@nestjs/common";
import { LabDto } from "../types/dto/Lab.dto";
import { CreateLabService } from "./create-lab/create-lab.service";

@Controller("lab")
export class LabController {
  constructor(private readonly createLabService: CreateLabService) {}

  // TODO: ログイン専用
  @Post()
  createLab(@Body() createLabRequestDto: Partial<LabDto>) {
    return this.createLabService.createLab(createLabRequestDto);
  }
}
