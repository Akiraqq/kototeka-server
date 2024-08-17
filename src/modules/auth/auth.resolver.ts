import { IUser } from 'src/types/types';
import { AuthService } from './auth.service';
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthInputDto, AuthResponseDto } from './dto';
import { CurrentUser } from 'src/common/decorators';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseDto)
  @UseGuards(GqlLocalAuthGuard)
  async login(
    @Args('authInput') authInputDto: AuthInputDto,
    @CurrentUser() user: IUser,
  ): Promise<AuthResponseDto> {
    return this.authService.login(user);
  }
}
