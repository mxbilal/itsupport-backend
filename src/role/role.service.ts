import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryParams } from 'src/custom-types';
import { IdGeneratorService } from 'src/id-generator/id-generator.service';
import { BaseService } from 'src/utils/Base.service';
import { PaginationUtil } from 'src/utils/pagination.util';
import { ResponseUtil } from 'src/utils/response.util';

@Injectable()
export class RoleService extends BaseService<any> {
  constructor(
    @InjectModel('Role') private roleModel: Model<any>,
    idGeneratorService: IdGeneratorService,
  ) {
    super(roleModel, idGeneratorService, 'Role');
  }
}
