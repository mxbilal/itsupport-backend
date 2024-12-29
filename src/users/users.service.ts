import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryParams } from 'src/custom-types';
import { IdGeneratorService } from 'src/id-generator/id-generator.service';
import { BaseService } from 'src/utils/Base.service';
import { ResponseUtil } from 'src/utils/response.util';

@Injectable()
export class UsersService extends BaseService<any> {
  constructor(
    @InjectModel('Users') private UserModel: Model<any>,
    @InjectModel('Role') private RoleModel: Model<any>,
    idgeneratorService: IdGeneratorService,
  ) {
    super(UserModel, idgeneratorService, 'User');
  }

  async updatePassword(payload: {
    id: number;
    newPassword: string;
    confirmPassword: string;
    email: string;
  }) {
    const { id, newPassword, confirmPassword, email } = payload;

    if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
      return ResponseUtil.error('Passwords do not match or are invalid.');
    }

    try {
      const user = await this.UserModel.findOne({ id, email });
      if (!user) {
        return ResponseUtil.error('User not found.');
      }

      // Hash the password
      // const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the password
      user.password = newPassword;
      await user.save();

      return ResponseUtil.success('Password updated successfully.');
    } catch (error) {
      return ResponseUtil.error('Failed to update password', error.message);
    }
  }

  async getAllUsers(queryParams: PaginationQueryParams) {
    const { PageNumber, pageSize, SortColumn, SortOrder, search } = queryParams;
    try {
      const validColumns = [
        'id',
        'firstName',
        'lastName',
        'email',
        'createdAt',
        'updatedAt',
      ];
      const validSortColumn = validColumns.includes(SortColumn)
        ? SortColumn
        : 'id';

      const sort: { [key: string]: 1 | -1 } = {
        [validSortColumn]: SortOrder === 'a' ? 1 : -1,
      };

      const query = search
        ? {
            $or: [
              { firstName: { $regex: search, $options: 'i' } },
              { lastName: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
            ],
          }
        : {};

      const results = await this.UserModel.find(query)
        .sort(sort)
        .skip((+PageNumber - 1) * +pageSize)
        .limit(+pageSize)
        .exec();

      const resultsWithRoleDTO = await Promise.all(
        results.map(async (user) => {
          const role = await this.RoleModel.findOne({ id: user.roleId }).select(
            'name isActive cost tools id',
          );
          const userObject = user.toObject();
          delete userObject.password;

          const fullName =
            (userObject?.firstName ?? '') + ' ' + (userObject?.lastName ?? '');

          return {
            ...userObject,
            enFullName: fullName,
            fullName,
            roleDTO: role ? role.toObject() : {},
            roles: role ? role.toObject()?.name || '' : '',
          };
        }),
      );

      const dataWithSrNo = resultsWithRoleDTO.map((item, index) => ({
        ...item,
        srNo: (+PageNumber - 1) * +pageSize + index + 1,
      }));

      const totalRecords = await this.UserModel.countDocuments(query);

      return ResponseUtil.success(
        `Users retrieved successfully`,
        dataWithSrNo,
        {
          totalRecords,
          pageNumber: +PageNumber,
          pageSize: +pageSize,
          totalPages: Math.ceil(totalRecords / +pageSize),
        },
      );
    } catch (error) {
      return ResponseUtil.error(`Failed to retrieve Users`, error.message);
    }
  }
}
