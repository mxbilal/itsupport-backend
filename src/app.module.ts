import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Ensure ConfigModule is loaded
      useFactory: async (configService: ConfigService) => {
        const mongoUrl = configService.get<string>('MONGO_URL');
        return { uri: mongoUrl };
      },
      inject: [ConfigService], // Inject ConfigService to access environment variables
    }),
    UsersModule,
    RoleModule,
    UserGroupModule,
    IdGeneratorModule,
  ],
  controllers: [AppController],
  providers: [AppService, RoleService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*'); // Apply middleware to all routes
  }
}
