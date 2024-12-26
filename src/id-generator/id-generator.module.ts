import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterSchema } from '../schemas/counter.schema';
import { IdGeneratorService } from './id-generator.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Counter', schema: CounterSchema }]),
  ],
  providers: [IdGeneratorService],
  exports: [IdGeneratorService], // Export service for use in other modules
})
export class IdGeneratorModule {}
