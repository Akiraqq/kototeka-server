import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  GqlLocalAuthGuard,
  GqlJwtGuard,
  GqlRefreshGuard,
} from '@src/common/guards';
import { AuthInputDto, TokensDto } from './dto';
import { GetCurrentUser } from 'src/common/decorators';
import { JwtPayloadWithRt, User } from '@src/types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokensDto)
  @UseGuards(GqlLocalAuthGuard)
  async login(
    @Args('authInput') authInputDto: AuthInputDto,
    @GetCurrentUser() user: User,
  ): Promise<TokensDto> {
    return this.authService.login(user);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlJwtGuard)
  async logout(@GetCurrentUser('sub') userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Mutation(() => TokensDto)
  @UseGuards(GqlRefreshGuard)
  async refreshTokens(
    @GetCurrentUser() payload: JwtPayloadWithRt,
  ): Promise<TokensDto> {
    return this.authService.refreshTokens(payload.email, payload.refreshToken);
  }
}
