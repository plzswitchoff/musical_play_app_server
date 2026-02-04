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
import { ShowCasting } from './show-casting.entity';
import { Show } from './show.entity';
import { ShowSchedule } from './show-schedule.entity';
import { Actor } from '../../actor/entity/actor.entity';

@Entity()
@Unique(['scheduleId', 'actorId'])
export class ScheduleCasting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scheduleId: number;

  @Column()
  actorId: number;

  @Column()
  characterName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn({ name: 'scheduleId' })
  @ManyToOne(() => ShowSchedule, (schedules) => schedules.castings)
  schedules: ShowSchedule;

  @JoinColumn({ name: 'actorId' })
  @ManyToOne(() => Actor, (actors) => actors.schedules)
  actor: Actor;
}
