import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
@InputType()
export class ChangePasswordInput {
  @Field()
  newPassword: string;
}
