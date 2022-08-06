import { User } from "../entities/User";
import { Field, InterfaceType, ObjectType } from "type-graphql";
import { MutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@InterfaceType({ implements: MutationResponse })
@ObjectType({ implements: MutationResponse })
export class UserMutationResponse implements MutationResponse {
  message?: string | undefined;
  success!: boolean;
  code!: number;

  @Field({ nullable: true })
  user?: User;

  @Field((_type) => [FieldError], { nullable: true })
  errors?: FieldError[];
}
