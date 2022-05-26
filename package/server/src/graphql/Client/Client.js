import { gql } from 'apollo-server-express';
import createRepository from '../../io/Database/createRepository';
import { ListSortmentEnum } from '../List/List';
import * as uuid from 'uuid';

export const typeDefs = gql`
    type Client implements Node{
        id: ID!
        name: String!
        email: String!
        disabled: Boolean!
    }

    type ClientList implements List {
        items: [Client!]!
        totalItems: Int!
        totalLength: Int!
    }

    input ClientListFilter{
        name: String
        email: String
        disabled: Boolean
    }

    input ClientListOptions {
        take: Int
        skip: Int
        sort: ListSort
        filter: ClientListFilter
    }

    input CreateClientInput{
        name: String!
        email: String!
    }

    input UpdateClientInput{
        id: ID!
        name: String!
        email: String!
    }

    extend type Query{
        findByID(id: ID!): Client
        allClients(options: ClientListOptions): ClientList
    }

    extend type Mutation{
        createClient(input: CreateClientInput!): Client!
        updateClient(input: UpdateClientInput!): Client! #Update Name and Email by ID
        deleteClient(id: ID!): Client!
        enableClient(id: ID!): Client!
        disableClient(id: ID!): Client!
    }

`;

export const resolvers = {
    Query: {
        findByID: async (_, { id }) => {
            const clients = await createRepository('client').read();
            return clients.find((client) => client.id === id);
        },

        allClients: async (_, args) => {
            const { take = 10, skip = 0, sort, filter } = args.options || [];
            const clients = await createRepository('client').read();
            if (sort && !(sort === undefined)) {
                clients.sort((clientA, clientB) => {
                    if (!['name', 'email', 'disabled'].includes(sort.sorter)) {
                        throw new Error(`Cannot sort by field ${sort.sorter}.`)
                    }

                    const fieldA = clientA[sort.sorter];
                    const fieldB = clientB[sort.sorter];

                    if (typeof fieldA === 'string') {
                        if (sort.sortment === ListSortmentEnum.ASC)
                            return fieldA.localeCompare(fieldB);
                        else
                            return fieldB.localeCompare(fieldA);
                    } else {
                        if (sort.sortment === ListSortmentEnum.ASC)
                            return Number(fieldB) - Number(fieldA);
                        else
                            return Number(fieldA) - Number(fieldB);
                    }
                });
            }

            const filteredClients = clients.filter((client) => {
                if (!filter || !filter.name || filter.name.length === 0 || filter === {})
                    return true;

                return Object.entries(filter).every(([field, value]) => {
                    if (client[field] === null || client[field] === undefined)
                        return false;
                    if (typeof value === 'string') {
                        if (value.startsWith('%') && value.endsWith('%'))
                            return client[field].includes(value.substring(1, value.length - 1));
                        if (value.startsWith('%'))
                            return client[field].endsWith(value.substring(1, value.length));
                        if (value.endsWith('%'))
                            return client[field].startsWith(value.substring(0, value.length - 1));
                        return client[field] === value;
                    }

                    return client[field] === value;
                });
            });

            return {
                items: filteredClients.slice(skip, skip + take),
                totalItems: filteredClients.slice(skip, skip + take).length,
                totalLength: clients.length,
            };
        }
    },

    Mutation: {
        createClient: async (_, args) => {
            const { name, email } = args.input;
            const clients = await createRepository('client').read();

            const client = {
                id: uuid.v4(),
                name,
                email,
                disabled: false,
            }

            await createRepository('client').write([...clients, client]);

            return client;
        },

        updateClient: async (_, args) => {
            const { id, name, email } = args.input;
            const clients = await createRepository('client').read();

            const currentClient = clients.find((client) => client.id === id);

            if (!currentClient) throw new Error(`There's no client with ${id} id`);


            const updatedClient = {
                ...currentClient,
                name,
                email,
            };

            const updatedClients = clients.map((client) => {
                if (client.id === id) return updatedClient;
                return client;
            });

            await createRepository('client').write(updatedClients);

            return updatedClient;
        },

        enableClient: async (_, { id }) => {
            const clients = await createRepository('client').read();

            const currentClient = clients.find((client) => client.id === id);

            if (!currentClient) throw new Error(`There's no client with ${id} id`);
            if (!currentClient.disabled) throw new Error(`The ${id} client is already enabled!`);

            const updatedClient = {
                ...currentClient,
                disabled: false,
            };

            const updatedClients = clients.map((client) => {
                if (client.id === id) return updatedClient;
                return client;
            });

            await createRepository('client').write(updatedClients);

            return updatedClient;
        },

        disableClient: async (_, { id }) => {
            const clients = await createRepository('client').read();

            const currentClient = clients.find((client) => client.id === id);

            if (!currentClient) throw new Error(`There's no client with ${id} id`);
            if (currentClient.disabled) throw new Error(`The ${id} client is already desabled!`);

            const updatedClient = {
                ...currentClient,
                disabled: true,
            };

            const updatedClients = clients.map((client) => {
                if (client.id === id) return updatedClient;
                return client;
            });

            await createRepository('client').write(updatedClients);

            return updatedClient;
        },

        deleteClient: async (_, { id }) => {
            const clients = await createRepository('client').read();

            const deletedClient = clients.find((client) => client.id === id);

            if (!deletedClient) throw new Error(`There's no client with ${id} id`);

            const updatedClients = clients.filter((client) => client.id !== id);

            await createRepository('client').write(updatedClients);

            return deletedClient;
        }

    }
}
