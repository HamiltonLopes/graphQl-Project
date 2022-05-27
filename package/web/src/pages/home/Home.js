import Style from './Home.module.css';
import React, {useState} from 'react';
import { ClientList }  from '../components/ClientList';
import ClientEdit from '../components/ClientEdit';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Home() {
    const nav = useNavigate();
    const [clientId, setClientId] = useState();
    const { state } = useLocation();

    return (
        <>
            {state?.authenticate? 
            <>
                <h2 className={Style.classHomeH2}>HOME</h2>
                <h4 className={Style.classHomeH4}>Você está logado!</h4>
                <h1 className={Style.classHomeH1}>{`Bem Vindo!!!!! ${state?.clientName}`}</h1>
                <button className={Style.classHomeButton} type='button' onClick={(e)=>{e.preventDefault(); nav('/clientList')}}>Ver Lista de Clientes</button>
            </>
            :
            <p>
                Você precisa está logado para acessar essa página!
            </p>}
            
            {/* <ClientList onSelectClient={setClientId}/>
            <ClientEdit clientId={clientId}/> */}
        </>
    );
}  