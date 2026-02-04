import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { TransferStatus } from '../enum/transfer-status.enum';
import { ShowSchedule } from '../../show/entity/show-schedule.entity';
import { UserAccount } from '../../user/entity/user-account.entity';
import { User } from '../../user/entity/user.entity';
import { TransferRequest } from './transfer-request.entity';
import { TransferBookmark } from './transfer-bookmark.entity';
import { TransferMute } from './transfer-mute.entity';

@Entity()
@Unique(['scheduleId', 'seatInfo'])
export class Transfer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sellerId: number;

  @Column()
  scheduleId: number;

  @Column()
  accountId: number;

  @Column()
  seatGrade: string;

  @Column()
  seatInfo: string;

  @Column()
  originalPrice: number;

  @Column()
  sellingPrice: number;

  @Column({ nullable: true })
  seatImageUrl: string;

  @Column({ nullable: true })
  seatImageOriginal: string;

  @Column()
  receiptImageUrl: string;

  @Column()
  receiptImageOriginal: string;

  @Column()
  lastFourDigits: string;

  @Column()
  description: string;

  @Column()
  status: TransferStatus;

  @Column()
  currentBuyerId: number | null;

  @Column()
  bumpedAt: Date | null;

  @Column()
  completedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @JoinColumn({ name: 'scheduleId' })
  @ManyToOne(() => ShowSchedule, (schedule) => schedule.transfers)
  schedule: ShowSchedule;

  @JoinColumn({ name: 'accountId' })
  @ManyToOne(() => UserAccount, (account) => account.transfers)
  account: UserAccount;

  @JoinColumn({ name: 'sellerId' })
  @ManyToOne(() => User, (user) => user.sellerTransfers)
  seller: User;

  @JoinColumn({ name: 'currentBuyerId' })
  @ManyToOne(() => User, (user) => user.currentBuyerTransfers)
  currentBuyer: User;

  @OneToMany(() => TransferRequest, (request) => request.transfer)
  requests: TransferRequest[];

  @OneToMany(() => TransferBookmark, (bookmarks) => bookmarks.transfer)
  bookmarks: TransferBookmark[];

  @OneToMany(() => TransferMute, (mutes) => mutes.transfer)
  mutes: TransferMute[];
}
