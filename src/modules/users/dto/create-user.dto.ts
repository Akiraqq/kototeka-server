import { IsEmail, MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(7, { message: 'The password must be longer than six characters' })
  password: string;
}
