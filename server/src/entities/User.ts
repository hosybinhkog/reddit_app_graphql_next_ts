import { Post } from "./Post";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Upvote } from "./Upvote";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field((_type) => ID || String)
  id!: number | string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  password!: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field((_return) => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];
}
