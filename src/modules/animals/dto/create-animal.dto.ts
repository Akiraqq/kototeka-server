import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { AnimalStatus, AnimalType } from '../enums';

@InputType()
export class CreateAnimalInput {
  @Field()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @Field()
  @IsNotEmpty()
  type: AnimalType;

  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 500)
  description?: string;

  @Field()
  @IsNotEmpty()
  status: AnimalStatus;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  photoUrls?: string[];

  @Field(() => ID, { nullable: true })
  @IsOptional()
  organizationId?: string;
}
