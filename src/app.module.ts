import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { sequenceModule } from './sequence/sequence.module';

@Module({
  imports: [sequenceModule],
})
export class AppModule {}