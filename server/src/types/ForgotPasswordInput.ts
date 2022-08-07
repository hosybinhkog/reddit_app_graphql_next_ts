import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
@ObjectType()
export class ForgotPasswordInput {
  @Field()
  email!: string;
}
