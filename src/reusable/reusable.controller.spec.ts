import { Test, TestingModule } from '@nestjs/testing';
import { ReusableController } from './reusable.controller';

describe('ReusableController', () => {
  let controller: ReusableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReusableController],
    }).compile();

    controller = module.get<ReusableController>(ReusableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
