import { Field, InterfaceType, ObjectType } from "type-graphql";

@InterfaceType()
@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
