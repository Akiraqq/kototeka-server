import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30, {
    message: 'The First Name length should not exceed 30 characters',
  })
  first_name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30, {
    message: 'The Last Name length should not exceed 30 characters',
  })
  last_name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @MinLength(7, { message: 'The password must be longer than six characters' })
  @MaxLength(30, { message: 'Too long password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
