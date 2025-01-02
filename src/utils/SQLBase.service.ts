import { Injectable } from '@nestjs/common';
import { BaseEntity, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryParams } from '../custom-types';
import { PaginationUtil } from './pagination.util';
import { ResponseUtil } from './response.util';

@Injectable()
export class BaseService {}
// export class sBaseService<T extends BaseEntity> {
//   constructor(
//     private readonly repository: Repository<T>,
//     protected readonly modelName: string,
//   ) {}

//   async create(payload: Partial<T>) {
//     try {
//       const newEntity = this.repository.create(payload);
//       const result = await this.repository.save(newEntity);
//       return ResponseUtil.success(
//         `${this.modelName} created successfully`,
//         result,
//       );
//     } catch (error) {
//       return ResponseUtil.error(
//         `Failed to create ${this.modelName}`,
//         error.message,
//       );
//     }
//   }

//   async update(payload: Partial<T>) {
//     try {
//       const result = await this.repository.update(payload.id, payload);
//       if (result.affected > 0) {
//         return ResponseUtil.success(
//           `${this.modelName} updated successfully`,
//           result,
//         );
//       }
//       return ResponseUtil.error(`No ${this.modelName} found to update`);
//     } catch (error) {
//       return ResponseUtil.error(
//         `Failed to update ${this.modelName}`,
//         error.message,
//       );
//     }
//   }

//   async delete(id: number) {
//     try {
//       const result = await this.repository.delete(id);
//       if (result.affected > 0) {
//         return ResponseUtil.success(
//           `${this.modelName} deleted successfully`,
//           result,
//         );
//       }
//       return ResponseUtil.error(`No ${this.modelName} found to delete`);
//     } catch (error) {
//       return ResponseUtil.error(
//         `Failed to delete ${this.modelName}`,
//         error.message,
//       );
//     }
//   }

//   async getAll(queryParams: PaginationQueryParams) {
//     const { PageNumber, pageSize, SortColumn, SortOrder, search } = queryParams;
//     try {
//       const validColumns = ['id', 'name', 'createdAt', 'updatedAt'];
//       const validSortColumn = validColumns.includes(SortColumn)
//         ? SortColumn
//         : 'id';

//       const sort: { [key: string]: 'ASC' | 'DESC' } = {
//         [validSortColumn]: SortOrder === 'a' ? 'ASC' : 'DESC',
//       };

//       const query = search
//         ? {
//             $or: [
//               { name: `%${search}%` },
//               { code: `%${search}%` },
//             ],
//           }
//         : {};

//       const results = await this.repository.find({
//         where: query,
//         order: sort,
//         skip: (PageNumber - 1) * pageSize,
//         take: pageSize,
//       });

//       const dataWithSrNo = PaginationUtil.addSerialNumbers(
//         results.map((item) => ({
//           ...item,
//         })),
//         PageNumber,
//         pageSize,
//       );

//       const totalRecords = await this.repository.count({ where: query });

//       return ResponseUtil.success(
//         `${this.modelName} retrieved successfully`,
//         dataWithSrNo,
//         {
//           totalRecords,
//           pageNumber: PageNumber,
//           pageSize,
//           totalPages: Math.ceil(totalRecords / pageSize),
//         },
//       );
//     } catch (error) {
//       return ResponseUtil.error(
//         `Failed to retrieve ${this.modelName}`,
//         error.message,
//       );
//     }
//   }
// }
