import {
  BaseEntity,
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  In,
  Index,
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
import { ChatRoom } from '../../chat/entity/chat-room.entity';

@Entity()
@Unique(['scheduleId', 'seatInfo'])
@Check('"sellingPrice" <= "originalPrice"')
export class Transfer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sellerId: number;

  @Column()
  scheduleId: number;

  // 좌석 정보
  @Column()
  accountId: number;

  @Column()
  seatGrade: string;

  // 가격
  @Column()
  seatInfo: string;

  @Column()
  originalPrice: number;

  @Column()
  sellingPrice: number;

  // 이미지
  @Column({ nullable: true })
  seatImageUrl: string;

  @Column({ nullable: true })
  seatImageOriginal: string;

  @Column()
  receiptImageUrl: string;

  @Column()
  receiptImageOriginal: string;

  // 예매 정보
  @Column()
  lastFourDigits: string;

  @Column()
  description: string;

  @Index()
  @Column()
  status: TransferStatus;

  @Column()
  currentBuyerId: number | null;

  @Column()
  bumpedAt: Date | null;

  @Column()
  completedAt: Date | null;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // Relations
  @Index()
  @JoinColumn({ name: 'scheduleId' })
  @ManyToOne(() => ShowSchedule, (schedule) => schedule.transfers)
  schedule: ShowSchedule;

  @JoinColumn({ name: 'accountId' })
  @ManyToOne(() => UserAccount, (account) => account.transfers)
  account: UserAccount;

  @Index()
  @JoinColumn({ name: 'sellerId' })
  @ManyToOne(() => User, (user) => user.sellerTransfers)
  seller: User;

  @JoinColumn({ name: 'currentBuyerId' })
  @ManyToOne(() => User, (user) => user.currentBuyerTransfers)
  currentBuyer: User;

  // Relations
  @OneToMany(() => TransferRequest, (request) => request.transfer)
  requests: TransferRequest[];

  @OneToMany(() => TransferBookmark, (bookmarks) => bookmarks.transfer)
  bookmarks: TransferBookmark[];

  @OneToMany(() => TransferMute, (mutes) => mutes.transfer)
  mutes: TransferMute[];

  @OneToMany(() => ChatRoom, (chats) => chats.transfer)
  chats: ChatRoom[];
}
