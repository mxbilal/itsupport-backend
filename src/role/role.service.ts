import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryParams } from 'src/custom-types';
import { IdGeneratorService } from 'src/id-generator/id-generator.service';
import { PaginationUtil } from 'src/utils/pagination.util';
import { ResponseUtil } from 'src/utils/response.util';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Role') private roleModel: Model<any>,
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  async createRole(payload: any) {
    try {
      const nextId = await this.idGeneratorService.getNextId('Role');
      const newRole = new this.roleModel({ ...payload, id: nextId });
      const result = await newRole.save();
      return ResponseUtil.success('Role created successfully', result);
    } catch (error) {
      return ResponseUtil.error('Failed to create role', error.message);
    }
  }

  async updateRole(payload: any) {
    try {
      const result = await this.roleModel.updateOne(
        { id: payload.id },
        payload,
      );
      if (result.modifiedCount > 0) {
        return ResponseUtil.success('Role updated successfully', result);
      }
      return ResponseUtil.error('No role found to update');
    } catch (error) {
      return ResponseUtil.error('Failed to update role', error.message);
    }
  }

  async deleteRole(id: number) {
    try {
      const result = await this.roleModel.deleteOne({ id });
      if (result.deletedCount > 0) {
        return ResponseUtil.success('Role deleted successfully', result);
      }
      return ResponseUtil.error('No role found to delete');
    } catch (error) {
      return ResponseUtil.error('Failed to delete role', error.message);
    }
  }

  async getAllRoles(queryParams: PaginationQueryParams) {
    const {
      PageNumber,
      pageSize,
      SortColumn = 'id',
      SortOrder = 'a',
      Search,
    } = queryParams;

    try {
      const validColumns = ['id', 'name', 'createdAt', 'updatedAt'];
      const validSortColumn = validColumns.includes(SortColumn)
        ? SortColumn
        : 'id';

      const sort: { [key: string]: 1 | -1 } = {
        [validSortColumn]: SortOrder === 'a' ? 1 : -1,
      };

      const query = Search ? { name: { $regex: Search, $options: 'i' } } : {};

      const results = await this.roleModel
        .find(query)
        .sort(sort)
        .skip((+PageNumber - 1) * +pageSize)
        .limit(+pageSize)
        .exec();

      const dataWithSrNo = PaginationUtil.addSerialNumbers(
        results.map((item) => ({
          ...item.toObject(),
        })),
        +PageNumber,
        +pageSize,
      );
      const totalRecords = await this.roleModel.countDocuments(query);

      return ResponseUtil.success(
        'Roles retrieved successfully',
        dataWithSrNo,
        {
          totalRecords,
          pageNumber: +PageNumber,
          pageSize: +pageSize,
          totalPages: Math.ceil(totalRecords / +pageSize),
        },
      );
    } catch (error) {
      return ResponseUtil.error('Failed to retrieve roles', error.message);
    }
  }
}
