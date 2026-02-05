import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from './entity/actor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  async getActors(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [actors, total] = await this.actorRepository.findAndCount({
      skip: offset,
      take: perPage,
      order: { createdAt: 'ASC' },
    });

    return {
      data: actors,
      total,
    };
  }

  async getActorById(id: number) {
    return this.actorRepository.findOne({ where: { id } });
  }
}
