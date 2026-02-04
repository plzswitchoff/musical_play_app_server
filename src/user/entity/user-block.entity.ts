import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@Unique(['blockerId', 'blockedId'])
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

  @ManyToOne(() => User, (user) => user.blockerUsers)
  blocker: User;

  @ManyToOne(() => User, (user) => user.blockedUsers)
  blocked: User;
}