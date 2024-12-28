import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserGroupService } from './user-group.service';

@Controller('userGroup')
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  @Post('/AddUpdate')
  async addUpdate(@Body() payload: any) {
    if (payload.id === 0) {
      return this.userGroupService.create(payload);
    } else {
      return this.userGroupService.update(payload);
    }
  }

  @Get()
  async getAll(@Query() query: any) {
    return this.userGroupService.getAll(query);
  }
  @Get('/GetAllUserGroup')
  async getDropdown(@Query() query: any) {
    const allGroups = await this.userGroupService.getAll(query);
    const dropdownData = allGroups.data.map((group) => ({
      id: group.id,
      name: group.name,
    }));
    return {
      succeeded: true,
      message: 'Dropdown data retrieved successfully',
      data: dropdownData,
    };
  }
}
