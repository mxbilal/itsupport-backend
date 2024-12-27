import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { DeleteResult, Model } from 'mongoose';
import { PaginationQueryParams } from 'src/custom-types';
import { PaginationUtil } from 'src/utils/pagination.util';
import { ResponseUtil } from 'src/utils/response.util';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private roleModel: Model<any>) {}

  async createRole(payload: any) {
    const newRole = new this.roleModel(payload);
    return newRole.save();
  }

  async updateRole(payload: any) {
    return this.roleModel.updateOne({ id: payload.id }, payload);
  }

  async deleteRole(id: number): Promise<DeleteResult> {
    return this.roleModel.deleteOne({ id });
  }

  async getAllRoles(queryParams: PaginationQueryParams) {
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
      const results = await this.roleModel
        .find(query)
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
