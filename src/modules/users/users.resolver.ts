import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto, CreatedUserResponseDto } from './dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => CreatedUserResponseDto)
  @UsePipes(new ValidationPipe())
  async createUser(
    @Args('createUserInput') createUserDto: CreateUserDto,
  ): Promise<CreatedUserResponseDto | undefined> {
    return this.usersService.createUser(createUserDto);
  }
}
