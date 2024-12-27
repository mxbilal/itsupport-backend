import {
    Controller,
    Post,
    Get,
    Query,
    UploadedFile,
    UseInterceptors,
    Body,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { NewsService } from './news.service';
  
  @Controller('News')
  export class NewsController {
    constructor(private readonly newsService: NewsService) {}
  
    @Post('/AddUpdateNews')
    @UseInterceptors(FileInterceptor('newsFile')) // Expecting `newsFile` field in form-data
    async addUpdate(
      @UploadedFile() file: Express.Multer.File, // Handles the binary file
      @Body() payload: any, // Handles the rest of the form fields
    ) {
      console.log('Payload:', payload);
      console.log('Uploaded File:', file);
  
      // Attach the file buffer to the payload for processing
      payload.newsFile = file?.buffer;
  
      if (Number(payload.id) === 0) {
        return this.newsService.createNews(payload);
      } else {
        return this.newsService.updateNews(payload);
      }
    }
  
    @Get()
    async getAll(@Query() query: any) {
      return this.newsService.getAllNews(query);
    }
  }
  