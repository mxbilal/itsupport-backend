import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdGeneratorService } from 'src/id-generator/id-generator.service';
import { BaseService } from 'src/utils/Base.service';
import { PaginationUtil } from 'src/utils/pagination.util';
import { ResponseUtil } from 'src/utils/response.util';

@Injectable()
export class NewsService extends BaseService<any> {
  constructor(
    @InjectModel('News') private NewsModel: Model<any>,
    idGeneratorService: IdGeneratorService,
  ) {
    super(NewsModel, idGeneratorService, 'News');
  }

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
}
