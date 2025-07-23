import { ApolloClient, InMemoryCache } from '@apollo/client';

const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';

const client = new ApolloClient({
  uri: isLocal
    ? 'http://localhost:8000/graphql'
    : 'https://web-production-a0a1.up.railway.app/graphql',
  cache: new InMemoryCache(),
});

export default client; 