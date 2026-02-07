import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../post/entity/post.entity';

@Entity()
export class PostCategories extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  order: number;

  // relations
  @OneToMany(() => Post, (post) => post.categories)
  post: Post[];
}
