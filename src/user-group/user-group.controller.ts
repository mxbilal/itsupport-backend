import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserGroupService } from './user-group.service';

@Controller('userGroup')
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  @Post('/AddUpdate')
  async addUpdate(@Body() payload: any) {
    console.log(payload);
    if (payload.id === 0) {
      return this.userGroupService.createUserGroup(payload);
    } else {
      return this.userGroupService.updateUserGroup(payload);
    }
  }

  @Get()
  async getAll(@Query() query: any) {
    const { PageNumber, PageSize, SortColumn, SortOrder, Search } = query;
    return this.userGroupService.getAllUserGroups(query);
  }
}
