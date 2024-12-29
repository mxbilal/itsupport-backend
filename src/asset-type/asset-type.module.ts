import { Module } from '@nestjs/common';
import { AssetTypeController } from './asset-type.controller';
import { AssetTypeService } from './asset-type.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetTypeSchema } from 'src/schemas/assetType.schema';
import { IdGeneratorModule } from 'src/id-generator/id-generator.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'AssetType', schema: AssetTypeSchema }]),
    IdGeneratorModule,
  ],
  controllers: [AssetTypeController],
  providers: [AssetTypeService],
})
export class AssetTypeModule {}
