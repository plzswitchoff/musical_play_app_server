import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatRoomStatus } from '../enum/chat-room-status.enum';
import { ChatRoomType } from '../enum/chat-room-type.enum';

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', default: ChatRoomType.TRANSFER })
  type: ChatRoomType;

  @Column()
  transferId: number;

  @Column()
  exchangeRequestId: number;

  @Column({ type: 'enum', default: ChatRoomStatus.CLOSED })
  status: ChatRoomStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
