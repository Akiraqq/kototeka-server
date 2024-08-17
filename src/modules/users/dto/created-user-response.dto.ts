import { ObjectType, Field } from '@nestjs/graphql';
import { UserDto } from './user.dto';

@ObjectType()
export class CreatedUserResponseDto {
  @Field()
  access_token: string;

  @Field(() => UserDto)
  user_data: UserDto;
}
