import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './entity/chat-room.entity';
import { ChatRoomUser } from './entity/chat-room-user.entity';
import { Message } from './entity/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom, ChatRoomUser, Message])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
