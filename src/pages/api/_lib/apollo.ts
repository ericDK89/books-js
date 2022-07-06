import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.GRAPHCMS_CONTENT_API as string,
  cache: new InMemoryCache(),
});
