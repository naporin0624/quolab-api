import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { MonipiController } from './monipi.controller';
import { CreateMonipiService } from './create-monipi/create-monipi.service';
import { MonipiService } from './monipi.service';

import { MonipiSchema} from '../types/schemas/monipi.schemas'
import { LabModule } from '../lab/lab.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "monipi",
        schema: MonipiSchema,
      },
    ]),
    LabModule
  ],
  controllers: [MonipiController],
  providers: [CreateMonipiService, MonipiService]
})
export class MonipiModule {}
