import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto, CreatedUserResponseDto } from './dto';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities';
import { GetCurrentUser, GqlJwtGuard, Roles, RolesGuard } from '@src/common';
import { Role } from '@src/common/enums';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => CreatedUserResponseDto)
  async createUser(
    @Args('createUserInput') dto: CreateUserDto,
  ): Promise<CreatedUserResponseDto | undefined> {
    return this.usersService.createUser(dto);
  }

  @Query(() => User)
  @UseGuards(GqlJwtGuard)
  async getMe(
    @GetCurrentUser('email') email: string,
  ): Promise<User | undefined> {
    return this.usersService.findOne(email);
  }

  @Mutation(() => Boolean)
  @Roles(Role.ADMIN)
  @UseGuards(GqlJwtGuard, RolesGuard)
  async deleteUser(@Args('email') email: string): Promise<boolean> {
    return this.usersService.deleteUser(email);
  }
}
