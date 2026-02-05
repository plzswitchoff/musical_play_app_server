import { Controller, Get, Param, Query } from '@nestjs/common';
import { ActorService } from './actor.service';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  getActors(@Query('page') page: number) {
    return this.actorService.getActors(page);
  }

  @Get(':id')
  getActorById(@Param('id') id: number) {
    return this.actorService.getActorById(id);
  }
}
