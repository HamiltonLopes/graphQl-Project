import { gql } from 'graphql-tag';
import { useQuery } from 'react-apollo';
import ClientEdit from './ClientEdit';
import { useState } from 'react';



const GET_CLIENT_LIST = gql`
    query GET_CLIENT_LIST($options: ClientListOptions) {
        allClients(options: $options) {
            items {
                id
                name
                email
            }
            totalLength
            totalItems
        }
    }
`;



var page = 0;
// var moviment = '';
export default function ClientList({ onSelectClient }) {
    const [components, setComponents] = useState([]);
    const ITEMS_PER_VIEW = 10;
    const GO_TO_NEXT_PAGE = 'next';
    const GO_TO_PREV_PAGE = 'prev';
    let SORTER = 'name';
    let SORTMENT = 'ASC';

    const nextPage = (skip) => {
        if (skip < ITEMS_PER_VIEW) skip = ITEMS_PER_VIEW;
        return page += (skip / ITEMS_PER_VIEW);
    }
    const prevPage = (prev) => {
        if (prev < ITEMS_PER_VIEW) prev = ITEMS_PER_VIEW;
        return page -= (prev / ITEMS_PER_VIEW)
    }

    const { data, error, loading, fetchMore } = useQuery(
        GET_CLIENT_LIST,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                options: {
                    take: ITEMS_PER_VIEW,
                    // skip: nextPage(10),
                    sort: {
                        sorter: SORTER,
                        sortment: SORTMENT
                    },
                    filter: {
                        name: "%%"
                    }
                }
            }
        }
    );

    console.log(data, page + 1);
    const clients = data?.allClients.items ?? [];

    const handleSelectClient = (client) => () => onSelectClient?.(client.id);

    const handleEdit = (id) => { //quando clica ele cria um elemento do client edit e adiciona no vetor
        setComponents([<ClientEdit clientId={id} setComponents={setComponents} />]) //passamos o vetor para client edit para que ele possa zera-lo posteriormente
    };

    const handleLoadMore = (moviment) => {
        if ((moviment === GO_TO_PREV_PAGE && page > 0) ||
            (moviment === GO_TO_NEXT_PAGE && ((page + 1) * ITEMS_PER_VIEW) < data.allClients.totalLength))
            fetchMore({
                variables: {
                    options: {
                        skip: moviment === GO_TO_PREV_PAGE ? prevPage(data.allClients.items.length) * ITEMS_PER_VIEW :
                            nextPage(data.allClients.items.length) * ITEMS_PER_VIEW,
                        take: ITEMS_PER_VIEW,
                        sort: {
                            sorter: SORTER,
                            sortment: SORTMENT
                        }
                    }
                },
                updateQuery: (result, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return result;
                    return fetchMoreResult;
                }
            });
    }

    if (error)
        return <section>
            <strong>Erro ao bsucar os clients</strong>
        </section>

    if (loading && !data)
        return <section>
            <strong>Carregando</strong>
        </section>



    return (
        <section>
            <ul>
                {
                    clients.map((client, i) => (
                        <li key={client.id} onClick={handleSelectClient(client)}>
                            <p>
                                {client.name}
                            </p>
                            <p>
                                {client.email}
                            </p>
                            <button type={'button'} onClick={(e)=>{e.preventDefault();
                                handleEdit(client.id);
                            }}>edit</button>
                            {
                                components.map((comp) => ( //renderiza o componente do vetor, somente o com id igual ao do cliente da lista acima
                                    <div key={i}>{comp.props.clientId === client.id ? comp : ""}</div>
                                ))
                            }
                        </li>
                    ))
                }
                <p>{`${(page*ITEMS_PER_VIEW)+1}-${(page*ITEMS_PER_VIEW)+data.allClients.totalItems} from ${data.allClients.totalLength}`}</p>
                <p>{`Page ${page + 1}`}</p>

                <button type={'button'} onClick={(e)=>{e.preventDefault();
                    handleLoadMore('prev');
                }}> Anterior </button>

                <button type={'button'} onClick={(e)=>{e.preventDefault();
                    handleLoadMore('next');
                }}> Próximo </button>

            </ul>
        </section>
    );
}
