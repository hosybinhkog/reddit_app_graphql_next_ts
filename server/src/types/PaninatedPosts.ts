import { Post } from "../entities/Post";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaninatedPosts {
  @Field()
  totalCount!: number;

  @Field((_type) => Date)
  cursor!: Date;

  @Field()
  hashMore!: boolean;

  @Field((_type) => [Post])
  paninatedPosts!: Post[];
}
