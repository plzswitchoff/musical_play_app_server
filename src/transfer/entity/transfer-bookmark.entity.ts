import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
export class TransferBookmark extends BaseEntity {
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

  @ManyToOne(() => User, (user) => user.transferBookmarks)
  user: User;

  // Relations
  @JoinColumn({ name: 'transferId' })
  @ManyToOne(() => Transfer, (transfer) => transfer.bookmarks, {
    onDelete: 'CASCADE',
  })
  transfer: Transfer;
}
