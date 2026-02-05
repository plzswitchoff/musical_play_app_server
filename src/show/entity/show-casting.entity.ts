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
@Unique(['showId', 'actorId', 'characterName'])
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

  // Relations
  @JoinColumn({ name: 'showId' })
  @ManyToOne(() => Show, (show) => show.castings, { onDelete: 'CASCADE' })
  show: Show;

  @JoinColumn({ name: 'actorId' })
  @ManyToOne(() => Actor, (actor) => actor.castings, { onDelete: 'CASCADE' })
  actor: Actor;
}
