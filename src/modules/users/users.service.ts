import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities';
import { CreateUserDto } from './dto';
import { PasswordService } from './password.service';
import { JwtPayload, UserAuthData } from '@src/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<UserAuthData | undefined> {
    const { email, password } = createUserDto;
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
    });

    const payload: JwtPayload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user_data: user,
    };
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
