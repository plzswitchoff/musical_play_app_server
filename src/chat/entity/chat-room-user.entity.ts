import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ChatRoom } from './chat-room.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
@Unique(['chatRoomId', 'userId'])
export class ChatRoomUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatRoomId: number;

  @Column()
  userId: number;

  @Column()
  lastReadAt: Date;

  @Column()
  joinedAt: Date;

  @Column()
  leftAt: Date;

  // Relations
  @Index()
  @JoinColumn({ name: 'chatRoomId' })
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.chatRoomUser, {
    onDelete: 'CASCADE',
  })
  chatRooms: ChatRoom;

  @Index()
  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.chatRoomUsers, { onDelete: 'CASCADE' })
  user: User;
}
