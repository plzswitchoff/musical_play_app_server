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
import { Show } from './show.entity';
import { ScheduleCasting } from './schedule-casting.entity';
import { Transfer } from '../../transfer/entity/transfer.entity';

@Entity()
@Unique(['showId', 'date', 'time'])
export class ShowSchedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  showId: number;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  round: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn({ name: 'showId' })
  @ManyToOne(() => Show, (show) => show.schedules)
  show: Show;

  @OneToMany(() => ScheduleCasting, (castings) => castings.schedules)
  castings: ScheduleCasting[];

  @OneToMany(() => Transfer, (transfer) => transfer.schedule)
  transfers: Transfer[];
}
