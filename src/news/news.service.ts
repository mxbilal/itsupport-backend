import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdGeneratorService } from 'src/id-generator/id-generator.service';
import { PaginationUtil } from 'src/utils/pagination.util';
import { ResponseUtil } from 'src/utils/response.util';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel('News') private NewsModel: Model<any>,
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  async createNews(payload: any) {
    try {
      const nextId = await this.idGeneratorService.getNextId('News');
      const newNews = new this.NewsModel({ ...payload, id: nextId });
      const result = await newNews.save();
      return ResponseUtil.success('News created successfully', result);
    } catch (error) {
      return ResponseUtil.error('Failed to create news', error.message);
    }
  }

  async updateNews(payload: any) {
    try {
      const result = await this.NewsModel.updateOne(
        { id: payload.id },
        payload,
      );
      if (result.modifiedCount > 0) {
        return ResponseUtil.success('News updated successfully', result);
      }
      return ResponseUtil.error('No news found to update');
    } catch (error) {
      return ResponseUtil.error('Failed to update news', error.message);
    }
  }

  async deleteNews(id: number) {
    try {
      const result = await this.NewsModel.deleteOne({ id });
      if (result.deletedCount > 0) {
        return ResponseUtil.success('News deleted successfully', result);
      }
      return ResponseUtil.error('No news found to delete');
    } catch (error) {
      return ResponseUtil.error('Failed to delete news', error.message);
    }
  }

  async getAllNews(queryParams: any) {
    const {
      PageNumber,
      pageSize,
      SortColumn = 'id',
      SortOrder = 'a',
      Search,
    } = queryParams;

    try {
      const validColumns = ['id', 'title', 'createdAt', 'updatedAt'];
      const validSortColumn = validColumns.includes(SortColumn)
        ? SortColumn
        : 'id';

      const sort: { [key: string]: 1 | -1 } = {
        [validSortColumn]: SortOrder === 'a' ? 1 : -1,
      };

      const query = Search ? { title: { $regex: Search, $options: 'i' } } : {};

      const results = await this.NewsModel.find(query)
        .sort(sort)
        .skip((+PageNumber - 1) * +pageSize)
        .limit(+pageSize)
        .exec();

      const dataWithSrNo = PaginationUtil.addSerialNumbers(
        results.map((item) => ({
          ...item.toObject(), // Convert to plain object
        })),
        +PageNumber,
        +pageSize,
      );
      const totalRecords = await this.NewsModel.countDocuments(query);

      return ResponseUtil.success('News retrieved successfully', dataWithSrNo, {
        extraData: totalRecords,
        PageNumber,
        pageSize,
      });
    } catch (error) {
      return ResponseUtil.error('Failed to retrieve news', error.message);
    }
  }
}
