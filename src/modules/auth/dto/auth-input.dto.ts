import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthInputDto {
  @Field()
  email: string;

  @Field()
  password: string;
}
