import { Field, InterfaceType, ObjectType } from "type-graphql";
import { Post } from "./../entities/Post";
import { FieldError } from "./FieldError";
import { MutationResponse } from "./MutationResponse";

@InterfaceType({ implements: MutationResponse })
@ObjectType({ implements: MutationResponse })
export class PostMutationResponse implements MutationResponse {
  success: boolean;
  message?: string | undefined;
  code!: number;

  @Field({ nullable: true })
  post?: Post;

  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
