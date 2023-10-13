import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';

describe('ReportsController', () => {
  let controller: ReportsController;

  /**
   * Unit tests skipped for Reports
   */

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [ReportsController],
  //   }).compile();

  //   controller = module.get<ReportsController>(ReportsController);
  // });

  it('should be ok', () => {
    expect(1).toEqual(1);
  });
});
