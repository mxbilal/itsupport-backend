import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdGeneratorService } from 'src/id-generator/id-generator.service';
import { BaseService } from 'src/utils/Base.service';

@Injectable()
export class AssetTypeService extends BaseService<any> {
  constructor(
    @InjectModel('AssetType') private assetTypeModel: Model<any>,
    idGeneratorService: IdGeneratorService,
  ) {
    super(assetTypeModel, idGeneratorService, 'AssetType');
  }
}
