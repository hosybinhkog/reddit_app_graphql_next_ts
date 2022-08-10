import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Upvote extends BaseEntity {
  @PrimaryColumn()
  userId!: number | string;

  @PrimaryColumn()
  postId!: number;

  @Column()
  value!: number;
}
