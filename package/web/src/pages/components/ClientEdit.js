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

export default function ClientEdit( {clientId} ){
    const { data } = useQuery(CLIENT, {
        variables:{
            clientId,
        },
        skip: !clientId,
    });

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

    return (
        <form>
            <input type="text" value={values.name} onChange={handleNameChange} />
            <input type="text" value={values.email} onChange={handleEmailChange}/>
            <button type="submit">Salvar</button>
        </form>
    );

}