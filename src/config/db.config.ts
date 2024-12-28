import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  const mongoUrl = configService.get<string>('MONGO_URL');
  return { uri: mongoUrl };
};
