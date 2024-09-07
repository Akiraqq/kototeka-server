import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy, JwtStrategy, JwtRefreshStrategy } from './strategies';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [UsersModule, PassportModule, JwtModule],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
