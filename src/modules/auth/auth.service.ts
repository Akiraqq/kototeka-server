import { UnauthorizedException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PasswordService } from '../users/password.service';
import { JwtService } from '@nestjs/jwt';
import { IUser, JwtPayload, UserAuthData } from '@src/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.usersService.findOne(email);

    if (user) {
      const isPasswordMatch = await this.passwordService.comparePasswords(
        password,
        user.password,
      );

      if (isPasswordMatch) {
        const { password, ...result } = user;
        return result;
      }
    }

    throw new UnauthorizedException('Email or password is incorrect');
  }

  async login(user: IUser): Promise<UserAuthData> {
    const payload: JwtPayload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user_data: user,
    };
  }
}
