import {ApolloClient} from 'apollo-client';
import link from './link';
import { InMemoryCache } from 'apollo-cache-inmemory';


const cache = new InMemoryCache();

const client = new ApolloClient({
    link,
    cache,
    connectToDevTools: true,
});

export default client;