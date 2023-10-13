import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createEstimate(estimateDto: GetEstimateDto) {
    // return this.repo.createQueryBuilder().select('*').getRawMany();
    return (
      this.repo
        .createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make = :make', { make: estimateDto.make })
        .andWhere('model = :model', { model: estimateDto.model })
        .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: estimateDto.lat }) // difference less than +/- 5
        .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: estimateDto.lng }) // difference less than +/- 5
        .andWhere('year - :year BETWEEN -3 AND 3', { year: estimateDto.year }) // difference less than +/- 3
        .andWhere('year - :year BETWEEN -3 AND 3', { year: estimateDto.year })
        // .andWhere('approved IS TRUE')
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({ mileage: estimateDto.mileage })
        .limit(3)
        .getRawOne()
    );
  }

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    // association
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
