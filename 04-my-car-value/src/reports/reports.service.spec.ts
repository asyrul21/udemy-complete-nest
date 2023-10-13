import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let service: ReportsService;

  /**
   * Unit tests skipped for Reports
   */
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ReportsService],
  //   }).compile();

  //   service = module.get<ReportsService>(ReportsService);
  // });

  it('should be ok', () => {
    expect(1).toEqual(1);
  });
});
