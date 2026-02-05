import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageType } from '../enum/message-type.enum';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatRoomId: number;

  @Column()
  senderId: number;

  @Column({ type: 'enum', default: MessageType.TEXT })
  type: MessageType;

  @Column()
  content: string;

  @Column({ nullable: true })
  imageUrl?: string | null;

  @Column({ nullable: true })
  metadata?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
