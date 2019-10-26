import { Controller, Post, Body } from '@nestjs/common';
import { CreateMonipiService } from './create-monipi/create-monipi.service';
import { MonipiDto } from '../types/dto/monipi.dto'
import { LabService } from '../lab/lab.service';

@Controller('monipi')
export class MonipiController {
  constructor(private readonly createMonipiService: CreateMonipiService, private readonly labService: LabService){}
  
  @Post()
  async registerMonipi(@Body() monipiDto: Partial<MonipiDto>) {
    const lab = await this.labService.findOneByLabCode(monipiDto.labCode)
    return this.createMonipiService.registerMonipi(monipiDto, lab)
  }
}
