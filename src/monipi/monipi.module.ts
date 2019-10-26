import { Module } from '@nestjs/common';
import { MonipiController } from './monipi.controller';
import { CreateMonipiService } from './create-monipi/create-monipi.service';
import { MonipiService } from './monipi.service';

@Module({
  controllers: [MonipiController],
  providers: [CreateMonipiService, MonipiService]
})
export class MonipiModule {}
