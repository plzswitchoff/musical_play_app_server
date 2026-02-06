import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query('page') page: number) {
    return this.userService.getUsers(page);
  }

  @Get('account')
  getUserAccounts(@Query('page') page: number) {
    return this.userService.getUserAccounts(page);
  }

  @Get('account/:id')
  getUserAccountById(@Param('id') id: number) {
    return this.userService.getUserAccountById(id);
  }

  @Get('block')
  getUserBlock(@Query('page') page: number) {
    return this.userService.getUserBlock(page);
  }

  @Get('block/:id')
  getUserBlockById(@Param('id') id: number) {
    return this.userService.getUserBlockById(id);
  }

  @Get('agreements')
  getUserAgreements(@Query('page') page: number) {
    return this.userService.getUserAgreements(page);
  }

  @Get('agreements/:id')
  getUserAgreementById(@Param('id') id: number) {
    return this.userService.getUserAgreementsById(id);
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUsersById(id);
  }
}
