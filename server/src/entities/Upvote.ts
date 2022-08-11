import { User } from "./User";
import { Post } from "./Post";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Upvote extends BaseEntity {
  @PrimaryColumn()
  userId!: number | string;

  @PrimaryColumn()
  postId!: number;

  @Column()
  value!: number;

  @ManyToOne((_to) => Post, (post) => post.upvotes)
  post!: Post;

  @ManyToOne((_to) => User, (user) => user.upvotes)
  user!: User;
}
