import { gql } from 'graphql-tag';
import { useQuery } from 'react-apollo';


const GET_CLIENT_LIST = gql`
    query GET_CLIENT_LIST($options: ClientListOptions) {
        allClients(options: $options) {
            items {
                id
                name
                email
            }
            showing
            totalItems
        }
    }
`;




export function ClientList() {

    const {
        data,
        error,
        loading,
    } = useQuery(GET_CLIENT_LIST, {
        fetchPolicy: 'cache-and-network',
        variables: {
            options: {
                take: 101,
                skip: 0,
                sort: {
                    sorter: "name",
                    sortment: "ASC"
                },
                filter: {
                    name: "%mi%"
                }
            }
        }
    });

    console.log(data);
    const clients = data?.allClients.items ?? [];
    if (error) return <section><strong>Erro ao bsucar os clients</strong></section>
    if (loading) return <section><strong>Carregando</strong></section>


    return (
        <section>
            <ul>
                {
                    clients.map((client) => (
                        <li key={client.id}>
                            <p>
                                {client.name}
                            </p>
                            <p>
                                {client.email}
                            </p>
                        </li>
                    ))
                }
                <p>{data.allClients.showing}</p>
            </ul>
        </section>
    );
}
