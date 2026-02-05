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
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Transfer } from '../../transfer/entity/transfer.entity';

@Entity()
@Unique(['userId', 'accountNumber'])
export class UserAccount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  bankCode: string;

  @Column()
  bankName: string;

  @Column()
  accountNumber: string;

  @Column()
  holderName: string;

  @Column({ default: false })
  isPrimary: boolean;

  @Column({ nullable: true })
  verifiedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // Relations
  @Index()
  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.userAccount, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Transfer, (transfer) => transfer.account)
  transfers: Transfer[];
}
