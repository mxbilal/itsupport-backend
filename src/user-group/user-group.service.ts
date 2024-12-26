import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryParams } from 'src/custom-types';
import { IdGeneratorService } from 'src/id-generator/id-generator.service';
import { PaginationUtil } from 'src/utils/pagination.util';
import { ResponseUtil } from 'src/utils/response.util';

@Injectable()
export class UserGroupService {
  constructor(
    @InjectModel('UserGroup') private UserGroupModel: Model<any>,
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  async createUserGroup(payload: any) {
    try {
      const nextId = await this.idGeneratorService.getNextId('UserGroup');
      const newRole = new this.UserGroupModel({ ...payload, id: nextId });
      const result = await newRole.save();
      return ResponseUtil.success('Role created successfully', result);
    } catch (error) {
      return ResponseUtil.error('Failed to create role', error.message);
    }
  }

  async updateUserGroup(payload: any) {
    try {
      const result = await this.UserGroupModel.updateOne(
        { id: payload.id },
        payload,
      );
      if (result.modifiedCount > 0) {
        return ResponseUtil.success('User group updated successfully', result);
      }
      return ResponseUtil.error('No user group found to update');
    } catch (error) {
      return ResponseUtil.error('Failed to update user group', error.message);
    }
  }

  async deleteUserGroup(id: number) {
    try {
      const result = await this.UserGroupModel.deleteOne({ id });
      if (result.deletedCount > 0) {
        return ResponseUtil.success('User group deleted successfully', result);
      }
      return ResponseUtil.error('No user group found to delete');
    } catch (error) {
      return ResponseUtil.error('Failed to delete user group', error.message);
    }
  }

  async getAllUserGroups(queryParams: PaginationQueryParams) {
    const {
      PageNumber,
      pageSize,
      SortColumn = 'id', // Default sort column
      SortOrder = 'a', // Default sort order
      Search,
    } = queryParams;
    try {
      // Validate SortColumn
      const validColumns = ['id', 'name', 'createdAt', 'updatedAt']; // Define valid fields
      const validSortColumn = validColumns.includes(SortColumn)
        ? SortColumn
        : 'id';

      // Construct sorting object
      const sort: { [key: string]: 1 | -1 } = {
        [validSortColumn]: SortOrder === 'a' ? 1 : -1,
      };

      // Construct query
      const query = Search ? { name: { $regex: Search, $options: 'i' } } : {};

      // Fetch data
      const results = await this.UserGroupModel.find(query)
        .sort(sort)
        .skip((+PageNumber - 1) * +pageSize)
        .limit(+pageSize)
        .exec();

      // Add serial numbers using the utility function
      const dataWithSrNo = PaginationUtil.addSerialNumbers(
        results.map((item) => ({
          ...item.toObject(), // Convert to plain object
        })),
        +PageNumber,
        +pageSize,
      );

      // Format and return success response
      return ResponseUtil.success(
        'User groups retrieved successfully',
        dataWithSrNo,
      );
    } catch (error) {
      // Handle errors and return error response
      return ResponseUtil.error(
        'Failed to retrieve user groups',
        error.message,
      );
    }
  }
}
