import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private roleModel: Model<any>) {}

  async createRole(payload: any) {
    const newRole = new this.roleModel(payload);
    return newRole.save();
  }

  async updateRole(payload: any) {
    return this.roleModel.updateOne({ id: payload.id }, payload);
  }

  async deleteRole(id: number) {
    return this.roleModel.deleteOne({ id });
  }

  async getAllRoles(
    PageNumber: number,
    PageSize: number,
    SortColumn: string = 'id',
    SortOrder: string = 'a',
    Search: string,
    userProfile: any,
  ) {
    const sort: { [key: string]: 1 | -1 } = {
      [SortColumn]: SortOrder === 'a' ? 1 : -1,
    };
    const query = Search ? { name: { $regex: Search, $options: 'i' } } : {};
    return this.roleModel
      .find(query)
      .sort(sort)
      .skip((PageNumber - 1) * PageSize)
      .limit(PageSize)
      .exec();
  }
}
