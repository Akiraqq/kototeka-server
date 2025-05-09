import { AnimalsService } from './animals.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Animal } from './entities';
import { GetCurrentUser, GqlJwtGuard, Roles, RolesGuard } from '@src/common';
import { Role } from '@src/common/enums';
import { UseGuards } from '@nestjs/common';
import { CreateAnimalInput, UpdateAnimalInput } from './dto';
import { User } from '@src/types';

@Resolver(() => Animal)
export class AnimalsResolver {
  constructor(private readonly animalsService: AnimalsService) {}

  @Mutation(() => Animal)
  @Roles(Role.ADMIN, Role.VOLUNTEER)
  @UseGuards(GqlJwtGuard, RolesGuard)
  createAnimal(
    @Args('createAnimalInput')
    createAnimalInput: CreateAnimalInput,
    @GetCurrentUser() user: User,
  ): Promise<Animal> {
    return this.animalsService.createAnimal(createAnimalInput, user);
  }

  @Mutation(() => Animal)
  @Roles(Role.ADMIN, Role.VOLUNTEER)
  @UseGuards(GqlJwtGuard, RolesGuard)
  updateAnimal(
    @Args('updateAnimalInput')
    updateAnimalInput: UpdateAnimalInput,
    @GetCurrentUser() user: User,
  ): Promise<Animal> {
    return this.animalsService.updateAnimal(updateAnimalInput, user);
  }

  @Query(() => [Animal])
  findAllAnimals(
    @Args('withDeleted', { type: () => Boolean, nullable: true })
    withDeleted?: boolean,
  ): Promise<Animal[]> {
    return this.animalsService.findAllAnimals(withDeleted);
  }

  @Query(() => Animal)
  findAnimal(@Args('id') id: string): Promise<Animal> {
    return this.animalsService.findOneAnimal(id);
  }

  @Mutation(() => Animal)
  @Roles(Role.ADMIN, Role.VOLUNTEER)
  @UseGuards(GqlJwtGuard, RolesGuard)
  deleteAnimal(
    @Args('id')
    id: string,
    @GetCurrentUser() user: User,
  ): Promise<Animal> {
    return this.animalsService.deleteAnimal(id, user);
  }

  @Mutation(() => Animal)
  @Roles(Role.ADMIN, Role.VOLUNTEER)
  @UseGuards(GqlJwtGuard, RolesGuard)
  restoreAnimal(
    @Args('id')
    id: string,
    @GetCurrentUser() user: User,
  ): Promise<Animal> {
    return this.animalsService.restoreAnimal(id, user);
  }
}
