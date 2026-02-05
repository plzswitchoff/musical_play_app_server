import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatRoomStatus } from '../enum/chat-room-status.enum';
import { ChatRoomType } from '../enum/chat-room-type.enum';
import { Transfer } from '../../transfer/entity/transfer.entity';
import { ChatRoomUser } from './chat-room-user.entity';
import { Message } from './message.entity';

@Entity()
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'enum', enum: ChatRoomType, default: ChatRoomType.TRANSFER })
  type: ChatRoomType;

  @Column()
  transferId: number;

  @Column()
  exchangeRequestId: number;

  @Index()
  @Column({
    type: 'enum',
    enum: ChatRoomStatus,
    default: ChatRoomStatus.CLOSED,
  })
  status: ChatRoomStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // Relations
  @JoinColumn({ name: 'transferId' })
  @ManyToOne(() => Transfer, (transfer) => transfer.chats, {
    onDelete: 'SET NULL',
  })
  transfer: Transfer;

  @OneToMany(() => ChatRoomUser, (chatRoomUser) => chatRoomUser.chatRooms)
  chatRoomUser: ChatRoomUser;

  @OneToMany(() => Message, (message) => message.chatRooms)
  messages: Message[];
}
