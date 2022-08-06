import { CreatePostInput } from "./CreatePostInput";
import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdatePostInput implements CreatePostInput {
  @Field()
  title: string;

  @Field()
  text: string;

  @Field(() => ID)
  id!: number;
}
