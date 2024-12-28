import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UserGroupModule } from './user-group/user-group.module';
import { IdGeneratorModule } from './id-generator/id-generator.module';
import { NewsModule } from './news/news.module';
import { getMongoConfig } from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMongoConfig,
      inject: [ConfigService],
    }),
    UsersModule,
    RoleModule,
    UserGroupModule,
    IdGeneratorModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService, RoleService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/public', method: RequestMethod.ALL },
        { path: '/auth/login', method: RequestMethod.POST },
      )
      .forRoutes('/q');
  }
}
