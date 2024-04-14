import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { ConfigModule, GraphQLModule, DatabaseModule } from './modules';

@Module({
  imports: [ConfigModule, GraphQLModule, DatabaseModule],
  providers: [AppService, AppResolver],
})
export class AppModule {}
