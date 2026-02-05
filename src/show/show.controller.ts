import { Controller, Get, Param, Query } from '@nestjs/common';
import { ShowService } from './show.service';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get()
  getShows(@Query('page') page: number) {
    return this.showService.getShows(page);
  }

  @Get('schedule')
  getShowSchedule(@Query('page') page: number) {
    return this.showService.getShowSchedule(page);
  }

  @Get('schedule/:id')
  getShowScheduleById(@Param('id') id: number) {
    return this.showService.getShowScheduleById(id);
  }

  @Get('casting')
  getShowCasting(@Query('page') page: number) {
    return this.showService.getShowCasting(page);
  }

  @Get('casting/:id')
  getShowCastingById(@Param('id') id: number) {
    return this.showService.getShowCastingById(id);
  }

  @Get('scheduleCasting')
  getScheduleCasting(@Query('page') page: number) {
    return this.showService.getScheduleCasting(page);
  }

  @Get('scheduleCasting/:id')
  getScheduleCastingById(@Param('id') id: number) {
    return this.showService.getScheduleCastingById(id);
  }

  @Get(':id')
  getShowById(@Param('id') id: number) {
    return this.showService.getShowById(id);
  }
}
