import { ObjectType, Field } from '@nestjs/graphql';
import { UserDto } from '@src/modules/users/dto';

@ObjectType()
export class AuthResponseDto {
  @Field()
  access_token: string;

  @Field(() => UserDto)
  user_data: UserDto;
}
