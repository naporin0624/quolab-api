import { Controller, Post, Body } from '@nestjs/common';
import { CreateLabRequestDto } from '../types/requestDto/createLabRequestDto'
import {CreateLabService} from './create-lab/create-lab.service'

@Controller('lab')
export class LabController {
  constructor(private readonly createLabService: CreateLabService) {}

  // TODO: ログイン専用 
  @Post()
  createLab(@Body() createLabRequestDto: CreateLabRequestDto) {
    return this.createLabService.createLab(createLabRequestDto)
  }

}
