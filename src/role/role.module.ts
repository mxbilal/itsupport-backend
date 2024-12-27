import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleSchema } from '../schemas/role.schema';
import { IdGeneratorModule } from 'src/id-generator/id-generator.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]),
    IdGeneratorModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [MongooseModule],
})
export class RoleModule {}
