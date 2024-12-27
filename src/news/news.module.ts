import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from '../schemas/news.schema';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { IdGeneratorModule } from 'src/id-generator/id-generator.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }]),
    IdGeneratorModule,
    MulterModule.register({}),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
