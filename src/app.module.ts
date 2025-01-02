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
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UserGroupModule } from './user-group/user-group.module';
import { IdGeneratorModule } from './id-generator/id-generator.module';
import { NewsModule } from './news/news.module';
import { getMongoConfig } from './config/db.config';
import { AssetTypeModule } from './asset-type/asset-type.module';
import { AssetModule } from './asset/asset.module';
import { QuessionaireModule } from './quessionaire/quessionaire.module';
import { getMySQLConfig } from './config/mysql.config';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMongoConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMySQLConfig,
      inject: [ConfigService],
    }),
    UsersModule,
    RoleModule,
    UserGroupModule,
    IdGeneratorModule,
    NewsModule,
    AssetTypeModule,
    AssetModule,
    QuessionaireModule,
    ServicesModule,
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
