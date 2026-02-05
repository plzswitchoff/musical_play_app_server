import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  In,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { TransferRequestStatus } from '../enum/transfer-request.enum';
import { Transfer } from './transfer.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
@Unique(['transferId', 'requesterId'])
export class TransferRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transferId: number;

  @Column()
  requesterId: number;

  @Column()
  queuePosition: number;

  @Index()
  @Column()
  status: TransferRequestStatus;

  // 밀리초 정밀도
  @Column()
  requestedAt: Date;

  @Column()
  selectedAt: Date | null;

  @Column()
  respondedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Index()
  @JoinColumn({ name: 'transferId' })
  @ManyToOne(() => Transfer, (transfer) => transfer.requests, {
    onDelete: 'CASCADE',
  })
  transfer: Transfer;

  @Index()
  @JoinColumn({ name: 'requesterId' })
  @ManyToOne(() => User, (requester) => requester.transferRequests)
  requester: User;
}
