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
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Transfer } from './transfer.entity';

@Entity()
@Unique(['userId', 'transferId'])
export class TransferMute extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  transferId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Index()
  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.transferMutes, { onDelete: 'CASCADE' })
  user: User;

  @JoinColumn({ name: 'transferId' })
  @ManyToOne(() => Transfer, (transfer) => transfer.mutes, {
    onDelete: 'CASCADE',
  })
  transfer: Transfer;
}
