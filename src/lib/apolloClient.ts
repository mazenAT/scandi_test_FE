import { ApolloClient, InMemoryCache } from '@apollo/client';

const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';

const client = new ApolloClient({
  uri: isLocal
    ? 'http://localhost:8000/graphql'
    : 'https://cors-anywhere.herokuapp.com/https://scanditest.fwh.is/graphql',
  cache: new InMemoryCache(),
});

export default client; 