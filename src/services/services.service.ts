import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { ServiceEntity } from './entities/service.entity';
import { ResponseUtil } from 'src/utils/response.util';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PaginationQueryParams } from './dto/pagination-query.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<ServiceEntity> {
    const service = this.serviceRepository.create(createServiceDto);
    return await this.serviceRepository.save(service);
  }

  async findAll(queryParams: PaginationQueryParams): Promise<any> {
    const { PageNumber, pageSize, SortColumn, SortOrder, search } = queryParams;

    const validColumns = ['id', 'name', 'createdOn', 'lastModifiedOn'];
    const validSortColumn = validColumns.includes(SortColumn)
      ? SortColumn
      : 'id';

    const sort: { [key: string]: 'ASC' | 'DESC' } = {
      [validSortColumn]: SortOrder === 'a' ? 'ASC' : 'DESC',
    };

    const query: FindManyOptions<ServiceEntity> = {
      where: search ? { name: ILike(`%${search}%`) } : undefined, // Apply search condition if provided
      order: sort,
      skip: (PageNumber - 1) * pageSize,
      take: pageSize,
    };
    try {
      const [results, totalRecords] =
        await this.serviceRepository.findAndCount(query);

      const totalPages = Math.ceil(totalRecords / pageSize);

      return {
        message: 'SubServices retrieved successfully',
        data: results,
        pagination: {
          totalRecords,
          pageNumber: PageNumber,
          pageSize,
          totalPages,
        },
      };
    } catch (error) {
      return {
        message: `Failed to retrieve SubServices`,
        error: error.message,
      };
    }
  }

  async findOne(id: number): Promise<ServiceEntity> {
    return await this.serviceRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<ServiceEntity> {
    await this.serviceRepository.update(id, updateServiceDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.serviceRepository.delete(id);
  }
}
