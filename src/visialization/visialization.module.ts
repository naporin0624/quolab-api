import { Module } from '@nestjs/common';
import { VisializationService } from './visialization.service';

@Module({
  providers: [VisializationService]
})
export class VisializationModule {}
