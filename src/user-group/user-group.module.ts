import { Module } from '@nestjs/common';
import { UserGroupController } from './user-group.controller';
import { UserGroupService } from './user-group.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGroupSchema } from 'src/schemas/userGroup.schema';
import { IdGeneratorModule } from 'src/id-generator/id-generator.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserGroup', schema: UserGroupSchema }]),
    IdGeneratorModule,
  ],
  controllers: [UserGroupController],
  providers: [UserGroupService],
  exports: [MongooseModule],
})
export class UserGroupModule {}
