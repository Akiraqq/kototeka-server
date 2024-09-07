import { Module } from '@nestjs/common';
import { JwtModule as jwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule, jwtModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
