import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserGroupService } from './user-group.service';

@Controller('userGroup')
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  @Post('/AddUpdate')
  async addUpdate(@Body() payload: any) {
    if (payload.id === 0) {
      return this.userGroupService.createUserGroup(payload);
    } else {
      return this.userGroupService.updateUserGroup(payload);
    }
  }

  @Get()
  async getAll(@Query() query: any) {
    return this.userGroupService.getAllUserGroups(query);
  }
  @Get('/GetAllUserGroup')
  async getDropdown(@Query() query: any) {
    const allGroups = await this.userGroupService.getAllUserGroups(query);
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
