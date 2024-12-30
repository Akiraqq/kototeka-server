import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository, UpdateResult } from 'typeorm';
import { User } from './entities';
import { CreateUserDto } from './dto';
import { PasswordService } from './password.service';
import { JwtPayload, Tokens } from '@src/types';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<Tokens | undefined> {
    const { email, password, ...restData } = dto;
    const existingUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('This email already exist');
    }

    const hashedPassword = await this.passwordService.hashPassword(password);

    const user = await this.userRepository.save({
      email,
      password: hashedPassword,
      ...restData,
    });

    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    const tokens = await this.jwtService.getTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async deleteUser(email: string): Promise<boolean> {
    const result = await this.userRepository.softDelete({ email });

    return result.affected > 0;
  }

  async deleteRefreshToken(userId: string): Promise<boolean> {
    const result: UpdateResult = await this.userRepository.update(
      {
        id: userId,
        refresh_token: Not(IsNull()),
      },
      { refresh_token: null },
    );

    return result.affected > 0;
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userRepository.update(
      {
        id: userId,
      },
      {
        refresh_token: refreshToken,
      },
    );
  }
}
