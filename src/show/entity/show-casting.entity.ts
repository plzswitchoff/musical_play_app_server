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
import { Show } from './show.entity';
import { Actor } from '../../actor/entity/actor.entity';

@Entity()
@Unique(['showId', 'actorId'])
export class ShowCasting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  showId: number;

  @Column()
  actorId: number;

  @Column()
  characterName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @JoinColumn({ name: 'showId' })
  @ManyToOne(() => Show, (show) => show.castings)
  show: Show;

  @JoinColumn({ name: 'actorId' })
  @ManyToOne(() => Actor, (actor) => actor.castings)
  actor: Actor;
}
