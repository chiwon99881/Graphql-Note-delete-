import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { defaults, typeDefs, resolvers} from './clientState';

const cache = new InMemoryCache();

const stateLink = new withClientState({
    cache,
    defaults,
    typeDefs,
    resolvers,
})

const client = new ApolloClient({
    cache,
    link:ApolloLink.from([stateLink])
});

export default client;