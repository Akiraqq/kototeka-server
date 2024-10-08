import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TokensDto {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}
