import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateAnimalInput } from './create-animal.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UpdateAnimalInput extends PartialType(
  OmitType(CreateAnimalInput, ['organizationId'] as const),
) {
  @IsUUID()
  @IsNotEmpty()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @IsNotEmpty()
  @Field(() => ID)
  organizationId: string;
}
