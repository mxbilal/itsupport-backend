import { Test, TestingModule } from '@nestjs/testing';
import { IdGeneratorController } from './id-generator.controller';

describe('IdGeneratorController', () => {
  let controller: IdGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdGeneratorController],
    }).compile();

    controller = module.get<IdGeneratorController>(IdGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
