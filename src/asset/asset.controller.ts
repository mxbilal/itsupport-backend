import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AssetService } from './asset.service';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}
  @Post('/AddUpdate')
  async addUpdate(@Body() payload: any) {
    if (payload.id === 0) {
      return this.assetService.create(payload);
    } else {
      return this.assetService.update(payload);
    }
  }

  @Get()
  async getAll(@Query() query: any) {
    return this.assetService.getAll(query);
  }
}
