import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShowCategory } from '../enum/show-category.enum';
import { ShowStatus } from '../enum/show-status.enum';
import { ShowAgeLimit } from '../enum/show-age-limit.enum';
import { ShowCasting } from './show-casting.entity';
import { ShowSchedule } from './show-schedule.entity';

@Entity()
export class Show extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: ShowCategory.MUSICAL })
  category: ShowCategory;

  @Column()
  venueName: string;

  @Column({ nullable: true })
  posterUrl?: string | null;

  @Column()
  startedAt: Date;

  @Column()
  endedAt: Date;

  @Column({ nullable: true })
  runningTime?: number | null;

  @Column({ nullable: true })
  intermission?: number | null;

  @Column({ nullable: true })
  ageLimit: ShowAgeLimit | null;

  @Column({ type: 'jsonb', nullable: true })
  seatPrice?: any | null;

  @Column({ default: ShowStatus.UPCOMING })
  status: ShowStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => ShowCasting, (castings) => castings.show)
  castings: ShowCasting[];

  @OneToMany(() => ShowSchedule, (schedules) => schedules.show)
  schedules: ShowSchedule[];
}
