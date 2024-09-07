import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto, CreatedUserResponseDto } from './dto';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities';
import { GetCurrentUser, GqlJwtGuard, Roles, RolesGuard } from '@src/common';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => CreatedUserResponseDto)
  async createUser(
    @Args('createUserInput') createUserDto: CreateUserDto,
  ): Promise<CreatedUserResponseDto | undefined> {
    return this.usersService.createUser(createUserDto);
  }

  @Query(() => User)
  @UseGuards(GqlJwtGuard)
  async getMe(
    @GetCurrentUser('email') email: string,
  ): Promise<User | undefined> {
    return this.usersService.findOne(email);
  }
}
