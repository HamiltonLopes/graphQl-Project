import Style from './Home.module.css';
import React, { useState } from 'react';
import { ClientList } from '../components/ClientList';
import ClientEdit from '../components/ClientEdit';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Home() {
    const nav = useNavigate();
    const [clientId, setClientId] = useState();
    const { state } = useLocation();

    return (
        <div className={Style.classHomeContainer}>
            {/* {state?.authenticate ? */}
                {/* <> */}
                    <section>
                        <nav>
                            <div className={Style.classNavWrapper}>

                                <div className={Style.classNavMenu}>
                                    <a class="logo" onclick="closeMenu()" href="#home">Logo
                                    </a>
                                    <ul className={Style.classNavMenuUl}>
                                        <li><a onclick="closeMenu()" href="#home">Início</a></li>
                                        <li><a onclick="closeMenu()" href="#services">Serviços</a></li>
                                        <li><a onclick="closeMenu()" href="#about">Sobre</a></li>
                                        <li><a onclick="closeMenu()" href="#testimonials">Depoimentos</a></li>
                                    </ul>

                                    {
                                        state?.authenticate ?
                                            <text>{`Olá, ${state.clientName}.`}</text>
                                            :
                                            <a class="button" href="#s" onClick={nav('/')}>
                                                Sign-in
                                            </a>
                                    }
                                    {
                                        !state?.authenticate ?
                                            <a class="button" href="#s" onclick="closeMenu()">
                                                Sign-up
                                            </a>
                                            :
                                            <a class="button" href="#s" onClick={nav('/')}>
                                                Logout
                                            </a>
                                    }


                                </div>
                            </div>
                        </nav>
                    </section>

                    <h2 className={Style.classHomeH2}>HOME</h2>
                    <h4 className={Style.classHomeH4}>Você está logado!</h4>
                    <h1 className={Style.classHomeH1}>{`Bem Vindo!!!!! ${state?.clientName}`}</h1>
                    <button className={Style.classHomeButton} type='button' onClick={(e) => { e.preventDefault(); nav('/clientList') }}>Ver Lista de Clientes</button>
                {/* </> */}
                {/* :
                <p>
                    Você precisa está logado para acessar essa página!
                </p>}

            { */}
             {/* <ClientList onSelectClient={setClientId}/>
            <ClientEdit clientId={clientId}/>  */}
        </div>
    );
}  