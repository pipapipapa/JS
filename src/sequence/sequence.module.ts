import { Module } from '@nestjs/common';
import { sequencesService } from './sequence.service';
import { sequencesController } from './sequence.controller';
import { FileService } from '../file.service';
import { Sequence } from './entities/sequence.entity';

@Module({
  controllers: [sequencesController],
  providers: [
    sequencesService,
    {
      provide: FileService,
      useFactory: () => new FileService<Sequence[]>('assets/sequences.json'),
    },
  ],
})
export class sequenceModule {}
