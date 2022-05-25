import Style from './Home.module.css';
import React from 'react';
import { ClientList }  from '../components/ClientList';

export default function Home() {
    return (
        <>
            <h2 className={Style.classHomeH2}>HOME</h2>
            <h4 className={Style.classHomeH4}>Você está logado!</h4>
            <h1 className={Style.classHomeH1}>Bem Vindo!!!!!</h1>
            <ClientList />
        </>
    );
}  