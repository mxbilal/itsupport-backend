import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AssetTypeService } from './asset-type.service';

@Controller('AssetType')
export class AssetTypeController {
  constructor(private readonly assetTypeService: AssetTypeService) {}
  @Post('/AddUpdate')
  async addUpdate(@Body() payload: any) {
    if (payload.id === 0) {
      return this.assetTypeService.create(payload);
    } else {
      return this.assetTypeService.update(payload);
    }
  }

  @Get('GetAll')
  async getAll(@Query() query: any) {
    return this.assetTypeService.getAll(query);
  }

  @Get('/GetDropdownItems')
  async getDropdown(@Query() query: any) {
    const allGroups = await this.getAll(query);
    const dropdownData = allGroups.data.map((type) => ({
      id: type.id,
      name: type.name,
    }));
    return {
      succeeded: true,
      message: 'Dropdown data retrieved successfully',
      data: dropdownData,
    };
  }
}
