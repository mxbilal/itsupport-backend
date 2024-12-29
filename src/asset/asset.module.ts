import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { IdGeneratorModule } from 'src/id-generator/id-generator.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetSchema } from 'src/schemas/asset.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Asset', schema: AssetSchema }]),
    IdGeneratorModule,
  ],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
