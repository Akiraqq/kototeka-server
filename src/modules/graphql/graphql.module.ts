import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule as graphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    graphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/modules/graphql/schema.gql'),
    }),
  ],
})
export class GraphQLModule {}
