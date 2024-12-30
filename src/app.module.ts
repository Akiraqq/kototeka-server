import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import {
  ConfigModule,
  GraphQLModule,
  DatabaseModule,
  AuthModule,
  UsersModule,
  JwtModule,
  OrganizationsModule,
} from './modules';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    JwtModule,
    OrganizationsModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
