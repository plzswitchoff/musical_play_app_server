import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['chatRoomId', 'userId'])
export class ChatRoomUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatRoomId: number;

  @Column()
  userId: number;

  @Column()
  lastReadAt: Date;

  @Column()
  joinedAt: Date;

  @Column()
  leftAt: Date;
}
