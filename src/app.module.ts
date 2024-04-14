import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { ConfigModule, GraphQLModule } from './modules';

@Module({
  imports: [ConfigModule, GraphQLModule],
  providers: [AppService, AppResolver],
})
export class AppModule {}
