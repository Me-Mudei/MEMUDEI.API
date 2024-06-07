import { ApolloServerPluginInlineTrace } from "@apollo/server/plugin/inlineTrace";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { DynamicModule, Module } from "@nestjs/common";
import {
  GqlModuleOptions,
  GraphQLDriver,
  GraphQLModule as NestGraphQLModule,
} from "@nestjs/graphql";

@Module({})
export class GraphqlModule extends NestGraphQLModule {
  static forRoot(
    options?: GqlModuleOptions<GraphQLDriver<ApolloDriverConfig>>,
  ): DynamicModule {
    return super.forRoot({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault(),
        ApolloServerPluginInlineTrace(),
      ],
      context: ({ req }) => ({ req }),
      csrfPrevention: false,
      ...options,
    });
  }
}
