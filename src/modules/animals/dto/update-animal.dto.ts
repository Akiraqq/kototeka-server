import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateAnimalInput } from './create-animal.dto';

@InputType()
export class UpdateAnimalInput extends PartialType(
  OmitType(CreateAnimalInput, ['organizationId'] as const),
) {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  organizationId: string;
}
