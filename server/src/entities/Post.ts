import { User } from "./User";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Upvote } from "./Upvote";

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  title!: string;

  @Field((_return) => String)
  @Column()
  userId!: string;

  @Field((_return) => User)
  @ManyToOne(() => User, (user) => user.posts)
  user!: User;

  @Column()
  @Field()
  text!: string;

  @Field()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  @OneToMany((_to) => Upvote, (upvote) => upvote.post)
  upvotes: Upvote[];

  @Field((_return) => Number)
  @Column({ default: 0 })
  poins!: number;
}
