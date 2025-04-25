import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

@InputType()
export class CreateOrganizationInput {
  @Field()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  location?: string;

  @Field()
  @IsEmail()
  contactEmail: string;
}
