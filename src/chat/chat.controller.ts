import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getChatRoom(@Query('page') page: number) {
    return this.chatService.getChatRoom(page);
  }

  @Get('user')
  getChatRoomUser(@Query('page') page: number) {
    return this.chatService.getChatRoomUsers(page);
  }

  @Get('user/:id')
  getChatRoomUserById(@Param('id') id: number) {
    return this.chatService.getChatRoomUsersById(id);
  }

  @Get('message')
  getMessage(@Query('page') page: number) {
    return this.chatService.getMessage(page);
  }

  @Get('message/:id')
  getMessageById(@Param('id') id: number) {
    return this.chatService.getMessageById(id);
  }

  @Get(':id')
  getChatRoomById(@Param('id') id: number) {
    return this.chatService.getChatRoomById(id);
  }
}
