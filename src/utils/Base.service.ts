import { Model } from 'mongoose';
import { IdGeneratorService } from '../id-generator/id-generator.service';
import { PaginationQueryParams } from '..//custom-types';
import { PaginationUtil } from './pagination.util';
import { ResponseUtil } from './response.util';

export class BaseService<T> {
  constructor(
    private readonly model: Model<T>,
    protected readonly idGeneratorService?: IdGeneratorService,
    protected readonly modelName?: string,
  ) {}

  async create(payload: any) {
    try {
      const nextId = await this.idGeneratorService.getNextId(this.modelName);
      const newDocument = new this.model({ ...payload, id: nextId });
      const result = await newDocument.save();
      return ResponseUtil.success(
        `${this.modelName} created successfully`,
        result,
      );
    } catch (error) {
      return ResponseUtil.error(
        `Failed to create ${this.modelName}`,
        error.message,
      );
    }
  }

  async update(payload: any) {
    try {
      const result = await this.model.updateOne({ id: payload.id }, payload);
      if (result.modifiedCount > 0) {
        return ResponseUtil.success(
          `${this.modelName} updated successfully`,
          result,
        );
      }
      return ResponseUtil.error(`No ${this.modelName} found to update`);
    } catch (error) {
      return ResponseUtil.error(
        `Failed to update ${this.modelName}`,
        error.message,
      );
    }
  }

  async delete(id: number) {
    try {
      const result = await this.model.deleteOne({ id });
      if (result.deletedCount > 0) {
        return ResponseUtil.success(
          `${this.modelName} deleted successfully`,
          result,
        );
      }
      return ResponseUtil.error(`No ${this.modelName} found to delete`);
    } catch (error) {
      return ResponseUtil.error(
        `Failed to delete ${this.modelName}`,
        error.message,
      );
    }
  }

  async getAll(queryParams: PaginationQueryParams) {
    const { PageNumber, pageSize, SortColumn, SortOrder, search } = queryParams;
    try {
      const validColumns = ['id', 'name', 'createdAt', 'updatedAt'];
      const validSortColumn = validColumns.includes(SortColumn)
        ? SortColumn
        : 'id';

      const sort: { [key: string]: 1 | -1 } = {
        [validSortColumn]: SortOrder === 'a' ? 1 : -1,
      };

      const query = search
        ? {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { title: { $regex: search, $options: 'i' } },
            ],
          }
        : {};
      const results = await this.model
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

      const totalRecords = await this.model.countDocuments(query);

      return ResponseUtil.success(
        `${this.modelName} retrieved successfully`,
        dataWithSrNo,
        {
          totalRecords,
          pageNumber: +PageNumber,
          pageSize: +pageSize,
          totalPages: Math.ceil(totalRecords / +pageSize),
        },
      );
    } catch (error) {
      return ResponseUtil.error(
        `Failed to retrieve ${this.modelName}`,
        error.message,
      );
    }
  }
}
