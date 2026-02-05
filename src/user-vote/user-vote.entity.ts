import { VoteOption } from 'src/vote-option/vote-option.entity';
import { Vote } from 'src/vote/vote.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/entity/user.entity';

@Entity()
export class UserVote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userVotes)
  user: User;

  @ManyToOne(() => VoteOption, (voteOption) => voteOption.userVotes, {
    onDelete: 'CASCADE',
  })
  voteOption: VoteOption;
}
