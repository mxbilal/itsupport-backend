import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { RoleService } from './role.service';
import axios from 'axios';

@Controller('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('CreateRoleWithPermissionAsync')
  async createOrUpdateRole(@Body() payload: any, @Req() req) {
    const userProfile = req.userProfile; // Access user profile
    if (payload.id === 0) {
      return this.roleService.createRole({
        ...payload,
        createdBy: userProfile.id,
      });
    } else {
      return this.roleService.updateRole({
        ...payload,
        modifiedBy: userProfile.id,
      });
    }
  }

  @Delete('DeleteAsyn')
  async deleteRole(@Query('id') id: number, @Req() req) {
    const userProfile = req.userProfile; // Access user profile
    return this.roleService.deleteRole(id);
  }

  @Get('GetAllAsync')
  async getAllRoles(@Query() query: any, @Req() req) {
    const userProfile = req.userProfile; // Access user profile
    const { PageNumber, PageSize, SortColumn, SortOrder, Search } = query;
    return this.roleService.getAllRoles(
      +PageNumber,
      +PageSize,
      SortColumn,
      SortOrder,
      Search,
      userProfile,
    );
  }
  @Get('addTools')
  async addTools(@Query() query: any, @Req() req) {
    let result = [];
    let err = [];
    for (let i = 1; i < 42; i++) {
      try {
        let res = await axios.get(
          `https://devapi-itsupport.lyca.sa/api/Role/GetRoleWithPermissionByIdAsync?Id=${i}`,
          {
            // headers: {
            //   Authorization:
            //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwianRpIjoiNDY5YmZmMzMtNGEzNC00YjU3LWIzNjAtMGRmYmM5MzE1NWYxIiwiaXNzIjoiTFlDQUFkbWluIiwiaWF0IjoxNzM1MTA0MjQ3LCJFbWFpbElkIjoiYWRtaW5AbHljYS5jb20uc2EiLCJOYW1lIjoiTXIgQWRtaW4iLCJUZW5hbnRJZCI6IjEiLCJVc2VySWQiOiIzIiwiUm9sZSI6IkFkbWluaXN0cmF0b3IiLCJKb2luaW5nRGF0ZSI6IjEyLzMvMjAyMyAxMjowMDowMCBBTSIsIm5iZiI6MTczNTEwNDI0NywiZXhwIjoxNzM1MTExNDQ3LCJhdWQiOiJMWUNBVXNlcnMifQ.hBoEvTAAn9y7rdv-n819_m3V9cn2KSFFrYlm8ztE36Q',
            // },
          },
        );
        const { data } = res.data;
        data && result.push(data);
      } catch (e) {
        err.push(i);
        continue;
      }
    }
    return { result, err };
  }
}
