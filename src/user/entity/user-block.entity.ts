import {
  BaseEntity,
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@Unique(['blockerId', 'blockedId'])
@Check('"blockerId" != "blockedId"')
export class UserBlock extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blockerId: number;

  @Column()
  blockedId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  //Relations
  @Index()
  @JoinColumn({ name: 'blockerId' })
  @ManyToOne(() => User, (user) => user.blockerUsers, { onDelete: 'CASCADE' })
  blocker: User;

  @Index()
  @JoinColumn({ name: 'blockedId' })
  @ManyToOne(() => User, (user) => user.blockedUsers, { onDelete: 'CASCADE' })
  blocked: User;
}
