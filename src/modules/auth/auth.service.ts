import { UnauthorizedException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PasswordService } from '../users/password.service';
import { User, JwtPayload, Tokens } from '@src/types';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(email);

    if (user) {
      const isPasswordMatch = await this.passwordService.comparePasswords(
        password,
        user.password,
      );

      if (isPasswordMatch) {
        const { id, email, refresh_token, role } = user;

        return {
          userId: id,
          email,
          refresh_token,
          role,
        };
      }
    }

    throw new UnauthorizedException('Email or password is incorrect');
  }

  async login(user: User): Promise<Tokens> {
    const { email, userId, role } = user;
    const payload: JwtPayload = { email, sub: userId, role };

    const tokens = await this.jwtService.getTokens(payload);
    await this.usersService.updateRefreshToken(
      user.userId,
      tokens.refresh_token,
    );

    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    return await this.usersService.deleteRefreshToken(userId);
  }

  async refreshTokens(email: string, refreshToken: string): Promise<Tokens> {
    const user = await this.usersService.findOne(email);

    if (!user || !user.refresh_token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (refreshToken !== user.refresh_token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    const tokens = await this.jwtService.getTokens(payload);
    await this.usersService.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }
}
