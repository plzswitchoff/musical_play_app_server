import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageType } from '../enum/message-type.enum';
import { ChatRoom } from './chat-room.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatRoomId: number;

  // NULL이면 시스템 메세지
  @Column({ nullable: true })
  senderId: number;

  @Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
  type: MessageType;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  imageUrl?: string | null;

  // 시스템 메시지 추가 데이터
  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // Relations
  @JoinColumn({ name: 'chatRoomId' })
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages)
  chatRooms: ChatRoom[];

  @JoinColumn({ name: 'senderId' })
  @ManyToOne(() => User, (user) => user.messages)
  sender: User;
}
