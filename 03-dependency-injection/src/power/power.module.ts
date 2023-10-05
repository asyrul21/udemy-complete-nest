import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService], // default is private
  exports: [PowerService], // make service publis
})
export class PowerModule {}
