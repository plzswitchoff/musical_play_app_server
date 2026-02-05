import { Comment } from 'src/comment/comment.entity';
import { Like } from 'src/like/like.entity';
import { Post } from 'src/post/post.entity';
import { UserVote } from 'src/user-vote/user-vote.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserAccount } from './user-account.entity';
import { UserStatus } from '../enum/user-status.enum';
import { UserTrustGrade } from '../enum/user-trust-grade.enum';
import { UserBlock } from './user-block.entity';
import { UserAgreement } from './user-agreement.entity';
import { Transfer } from '../../transfer/entity/transfer.entity';
import { TransferRequest } from '../../transfer/entity/transfer-request.entity';
import { TransferBookmark } from '../../transfer/entity/transfer-bookmark.entity';
import { TransferMute } from '../../transfer/entity/transfer-mute.entity';
import { ChatRoomUser } from '../../chat/entity/chat-room-user.entity';
import { Message } from '../../chat/entity/message.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loginType: 'email' | 'kakao';

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  nickname?: string;

  @Column({ nullable: true })
  introduce?: string;

  @Column({ nullable: true })
  imageUri?: string;

  @Column({ nullable: true })
  expoPushToken?: string;

  @Column({ nullable: true })
  hatId: string;

  @Column({ nullable: true })
  faceId: string;

  @Column({ nullable: true })
  topId: string;

  @Column({ nullable: true })
  bottomId: string;

  @Column({ nullable: true })
  handId: string;

  @Column({ default: '01' })
  skinId: string;

  @Column({ nullable: true })
  background: string;

  @Column()
  phoneNumber: string;

  @Column({ default: 0 })
  trustScore: number;

  @Column({ default: UserTrustGrade.BRONZE })
  trustGrade: UserTrustGrade;

  @Column({ default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ nullable: true })
  banReason?: string | null;

  @Column({ default: false })
  isPremium: boolean;

  @Column({ nullable: true })
  premiumPlan?: string | null;

  @Column({ nullable: true })
  premiumExpiresAt?: Date | null;

  @Column({ nullable: true })
  canRejoinAt?: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // Relations
  @OneToMany(() => Post, (post) => post.user)
  post: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => UserVote, (userVote) => userVote.user)
  userVotes: UserVote[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => UserAccount, (account) => account.user)
  userAccount: UserAccount[];

  @OneToMany(() => UserBlock, (userBlock) => userBlock.blocker)
  blockerUsers: UserBlock[];

  @OneToMany(() => UserBlock, (userBlock) => userBlock.blocked)
  blockedUsers: UserBlock[];

  @OneToMany(() => UserAgreement, (agreements) => agreements.user)
  userAgreements: UserAgreement[];

  @OneToMany(() => Transfer, (transfer) => transfer.seller)
  sellerTransfers: Transfer[];

  @OneToMany(() => Transfer, (transfer) => transfer.currentBuyer)
  currentBuyerTransfers: Transfer[];

  @OneToMany(() => TransferRequest, (transfer) => transfer.requester)
  transferRequests: TransferRequest[];

  @OneToMany(() => TransferBookmark, (bookmark) => bookmark.user)
  transferBookmarks: TransferBookmark[];

  @OneToMany(() => TransferMute, (mute) => mute.user)
  transferMutes: TransferMute[];

  @OneToMany(() => ChatRoomUser, (chatRoomUser) => chatRoomUser.user)
  chatRoomUsers: ChatRoomUser[];

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];
}
