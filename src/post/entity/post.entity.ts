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
  UpdateDateColumn,
} from 'typeorm';

import { Image } from 'src/image/image.entity';
import { Comment } from 'src/comment/comment.entity';
import { Vote } from 'src/vote/vote.entity';
import { Like } from 'src/like/like.entity';
import { User } from '../../user/entity/user.entity';
import { PostCategories } from '../../post-categories/entity/post-categories.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  viewCount: number;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  // relations

  @OneToMany(() => Image, (image) => image.post, { onDelete: 'CASCADE' })
  images: Image[];

  @OneToMany(() => Comment, (comment) => comment.post, {
    eager: true,
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany(() => Vote, (vote) => vote.post, { onDelete: 'CASCADE' })
  votes: Vote[];

  @OneToMany(() => Like, (like) => like.post, { onDelete: 'CASCADE' })
  likes: Like[];

  @ManyToOne(() => User, (user) => user.post)
  user: User;

  // relations
  @ManyToOne(() => PostCategories, (categories) => categories.post)
  categories: PostCategories;
}
