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
import { ShowCasting } from '../../show/entity/show-casting.entity';
import { ScheduleCasting } from '../../show/entity/schedule-casting.entity';

@Entity()
export class Actor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  profileImage?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => ShowCasting, (casting) => casting.actor)
  castings: ShowCasting[];

  @OneToMany(() => ScheduleCasting, (schedule) => schedule.actor)
  schedules: ScheduleCasting[];
}
