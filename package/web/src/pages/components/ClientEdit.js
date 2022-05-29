import { useQuery, useMutation } from "react-apollo";
import gql from 'graphql-tag';
import {useMemo, useState, useEffect} from 'react';

const CLIENT = gql`
    query findByID($clientId: ID!){
        findByID(id: $clientId){
            id
            name
            email
        }
    }
`;

const UPDATE_CLIENT = gql`
    mutation UPDATE_CLIENT($id: ID!, $name: String!, $email: String!){
        updateClient(input: {
            id: $id,
            name: $name,
            email: $email,
        }){
            id
            name
            email
        }
    }
`;

export default function ClientEdit( {clientId , setComponents}  ){
    const { data } = useQuery(CLIENT, {
        variables:{
            clientId,
        },
        skip: !clientId,
        fetchPolicy: "cache-first",
    });
    const [ updateClient ] = useMutation(UPDATE_CLIENT);

    const initialValues = useMemo(
        () => ({
            name: data?.findByID.name ?? '',
            email: data?.findByID.email ?? '',
        }), [data]
    );

    useEffect(
        ()=>{
            setValues(initialValues);
        },[initialValues]
    );

    const [values, setValues] = useState(initialValues);

    const handleNameChange = event => {
        event.persist();

        setValues(values =>({
        ...values,
        name: event.target.value,
        }));
    };

    const handleEmailChange = event => {
        event.persist();

        setValues(values =>({
        ...values,
        email: event.target.value,
        }));
    };

    const handleSubmite = event => {
        event.preventDefault();

        updateClient({
            variables:{
                id: clientId,
                name: values.name,
                email: values.email,
            }
        }).then(console.log);

        if(setComponents) //se este componente for chamado em um vetor, ele zera o vetor
            setComponents([]);
    };

    return (
  
        <form Style={"display:flex; gap: 0.3rem;"}onSubmit={handleSubmite}>
            <input type="text" value={values.name} onChange={handleNameChange} />
            <input type="text" value={values.email} onChange={handleEmailChange}/>
            <button type="submit">Save</button>
        </form>
    );

}