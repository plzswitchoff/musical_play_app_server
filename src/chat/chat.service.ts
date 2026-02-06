import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from './entity/chat-room.entity';
import { Repository } from 'typeorm';
import { ChatRoomUser } from './entity/chat-room-user.entity';
import { Message } from './entity/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private ChatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(ChatRoomUser)
    private ChatRoomUserRepository: Repository<ChatRoomUser>,
    @InjectRepository(Message)
    private MessageRepository: Repository<Message>,
  ) {}

  async getChatRoom(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [room, total] = await this.ChatRoomRepository.findAndCount({
      skip: offset,
      take: perPage,
      order: { createdAt: 'ASC' },
      relations: ['transfer'],
      select: {
        id: true,
        type: true,
        transferId: true,
        status: true,
        createdAt: true,
        transfer: {
          id: true,
          sellerId: true,
          seatGrade: true,
          seatInfo: true,
          sellingPrice: true,
          seatImageOriginal: true,
          description: true,
        },
      },
    });

    return {
      data: room,
      total,
    };
  }

  async getChatRoomById(id: number) {
    return this.ChatRoomRepository.findOne({
      where: { id },
      relations: ['transfer'],
      select: {
        id: true,
        type: true,
        transferId: true,
        status: true,
        createdAt: true,
        transfer: {
          id: true,
          sellerId: true,
          seatGrade: true,
          seatInfo: true,
          sellingPrice: true,
          seatImageOriginal: true,
          description: true,
        },
      },
    });
  }

  async getChatRoomUsers(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [roomUsers, total] = await this.ChatRoomUserRepository.findAndCount({
      skip: offset,
      take: perPage,
      order: { lastReadAt: 'ASC' },
      relations: ['chatRooms', 'user'],
      select: {
        id: true,
        chatRoomId: true,
        userId: true,
        lastReadAt: true,
        chatRooms: {
          id: true,
          type: true,
          transferId: true,
          status: true,
        },
        user: {
          id: true,
          email: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
          createdAt: true,
        },
      },
    });

    return {
      data: roomUsers,
      total,
    };
  }
  async getChatRoomUsersById(id: number) {
    return this.ChatRoomUserRepository.findOne({
      where: { id },
      relations: ['chatRooms', 'user'],
      select: {
        id: true,
        chatRoomId: true,
        userId: true,
        lastReadAt: true,
        chatRooms: {
          id: true,
          type: true,
          transferId: true,
          status: true,
        },
        user: {
          id: true,
          email: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
          createdAt: true,
        },
      },
    });
  }

  async getMessage(page: number = 1) {
    const perPage = 10;
    const offset = (page - 1) * perPage;
    const [messages, total] = await this.MessageRepository.findAndCount({
      skip: offset,
      take: perPage,
      order: { createdAt: 'ASC' },
      relations: ['chatRooms', 'sender'],
      select: {
        id: true,
        chatRoomId: true,
        senderId: true,
        type: true,
        content: true,
        imageUrl: true,
        metadata: true,
        createdAt: true,
        chatRooms: {
          id: true,
          type: true,
          transferId: true,
          status: true,
        },
        sender: {
          id: true,
          email: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
          createdAt: true,
        },
      },
    });

    return {
      data: messages,
      total,
    };
  }

  async getMessageById(id: number) {
    return this.MessageRepository.findOne({
      where: { id },
      relations: ['chatRooms', 'sender'],
      select: {
        id: true,
        chatRoomId: true,
        senderId: true,
        type: true,
        content: true,
        imageUrl: true,
        metadata: true,
        createdAt: true,
        chatRooms: {
          id: true,
          type: true,
          transferId: true,
          status: true,
        },
        sender: {
          id: true,
          email: true,
          nickname: true,
          introduce: true,
          imageUri: true,
          trustGrade: true,
          createdAt: true,
        },
      },
    });
  }
}
