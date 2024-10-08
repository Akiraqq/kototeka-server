import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreatedUserResponseDto {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}
