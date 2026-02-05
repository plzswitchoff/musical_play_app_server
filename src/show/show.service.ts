import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from './entity/show.entity';
import { Repository } from 'typeorm';
import { ShowSchedule } from './entity/show-schedule.entity';
import { ShowCasting } from './entity/show-casting.entity';
import { ScheduleCasting } from './entity/schedule-casting.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    @InjectRepository(ShowSchedule)
    private showScheduleRepository: Repository<ShowSchedule>,
    @InjectRepository(ShowCasting)
    private showCastingRepository: Repository<ShowCasting>,
    @InjectRepository(ScheduleCasting)
    private scheduleCastingRepository: Repository<ScheduleCasting>,
  ) {}

  async getShows(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [shows, total] = await this.showRepository.findAndCount({
      skip: offset,
      take: perPage,
      order: { startedAt: 'ASC' },
    });

    return {
      data: shows,
      total,
    };
  }

  async getShowById(id: number) {
    return this.showRepository.findOne({ where: { id } });
  }

  async getShowSchedule(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [showSchedule, total] =
      await this.showScheduleRepository.findAndCount({
        skip: offset,
        take: perPage,
        order: { createdAt: 'ASC' },
        relations: ['show'],
      });

    return {
      data: showSchedule,
      total,
    };
  }

  async getShowScheduleById(id: number) {
    return this.showScheduleRepository.findOne({
      where: { id },
      relations: ['show'],
    });
  }

  async getShowCasting(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [showCasting, total] = await this.showCastingRepository.findAndCount({
      select: {
        id: true,
        createdAt: true,
        characterName: true,
        show: {
          id: true,
          title: true,
          category: true,
          venueName: true,
          posterUrl: true,
          status: true,
        },
        actor: {
          id: true,
          name: true,
          profileImage: true,
        },
      },
      skip: offset,
      take: perPage,
      order: { createdAt: 'ASC' },
      relations: ['show', 'actor'],
    });
    return {
      data: showCasting,
      total,
    };
  }

  async getShowCastingById(id: number) {
    return this.showCastingRepository.findOne({
      where: { id },
      relations: ['show', 'actor'],
    });
  }

  async getScheduleCasting(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [scheduleCasting, total] =
      await this.scheduleCastingRepository.findAndCount({
        select: {
          id: true,
          scheduleId: true,
          actorId: true,
          characterName: true,
          schedules: {
            id: true,
            date: true,
            time: true,
            round: true,
          },
          actor: {
            id: true,
            name: true,
            profileImage: true,
          },
        },
        skip: offset,
        take: perPage,
        order: { scheduleId: 'ASC' },
        relations: ['schedules', 'actor'],
      });
    return {
      data: scheduleCasting,
      total,
    };
  }

  async getScheduleCastingById(id: number) {
    return this.scheduleCastingRepository.findOne({
      where: { id },
      relations: ['schedules', 'actor'],
    });
  }
}
// schedule, actor
