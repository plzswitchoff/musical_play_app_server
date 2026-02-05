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
import { ShowSchedule } from './show-schedule.entity';
import { Actor } from '../../actor/entity/actor.entity';

@Entity()
@Unique(['scheduleId', 'characterName'])
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
  @ManyToOne(() => ShowSchedule, (schedules) => schedules.castings, {
    onDelete: 'CASCADE',
  })
  schedules: ShowSchedule;

  @JoinColumn({ name: 'actorId' })
  @ManyToOne(() => Actor, (actors) => actors.schedules, { onDelete: 'CASCADE' })
  actor: Actor;
}
