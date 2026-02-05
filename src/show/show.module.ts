import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entity/show.entity';
import { ShowSchedule } from './entity/show-schedule.entity';
import { ShowCasting } from './entity/show-casting.entity';
import { ScheduleCasting } from './entity/schedule-casting.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Show,
      ShowSchedule,
      ShowCasting,
      ScheduleCasting,
    ]),
  ],
  controllers: [ShowController],
  providers: [ShowService],
})
export class ShowModule {}
