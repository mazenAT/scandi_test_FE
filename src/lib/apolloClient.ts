import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://jycwdzlv.infinityfree.com/graphql',
  cache: new InMemoryCache(),
});

export default client; 