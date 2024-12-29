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
import { ResponseUtil } from 'src/utils/response.util'; // Assuming you have a response utility
import { UsersService } from './users.service';

@Controller('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('CreateNewUser')
  async createUser(@Body() payload: any, @Req() req) {
    // const userProfile = req.userProfile;
    const newUser = await this.userService.create({
      ...payload,
    });
    return ResponseUtil.success('User created successfully', newUser);
  }

  @Post('UpdateUser')
  async updateUser(@Body() payload: any) {
    const updatedUser = await this.userService.update({
      ...payload,
    });
    return ResponseUtil.success('User updated successfully', updatedUser);
  }

  @Post('ChangeUserPasswordByAdmin')
  async changeUserPassword(@Body() payload: any) {
    const updatedUser = await this.userService.updatePassword({
      ...payload,
    });
    return ResponseUtil.success('User updated successfully', updatedUser);
  }

  @Delete('DeleteUserById')
  async deleteUser(@Query('id') id: number): Promise<any> {
    return this.userService.delete(id);
  }

  @Get('GetAllAsync')
  async getAllUsers(@Query() query: any) {
    return this.userService.getAllUsers(query);
  }

  @Get('/GetAllUser')
  async getAllUsersDropdown(@Query() query: any) {
    return this.userService.getAllUsers(query);
  }
}
