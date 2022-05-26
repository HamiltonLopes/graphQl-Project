import Style from './Home.module.css';
import React, {useState} from 'react';
import { ClientList }  from '../components/ClientList';
import ClientEdit from '../components/ClientEdit';

export default function Home() {
    const [clientId, setClientId] = useState();
    return (
        <>
            {/* <h2 className={Style.classHomeH2}>HOME</h2>
            <h4 className={Style.classHomeH4}>Você está logado!</h4>
            <h1 className={Style.classHomeH1}>Bem Vindo!!!!!</h1> */}
            <ClientList onSelectClient={setClientId}/>
            <ClientEdit clientId={clientId}/>
        </>
    );
}  