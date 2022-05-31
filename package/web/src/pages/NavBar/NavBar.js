import Style from '../home/Home.module.css';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateClient from '../Registration/CreateClient';
import hclogo from '../../assets/vtex-logo.svg';



export default function NavBar() {
    const nav = useNavigate();
    const { state } = useLocation();
    const [reg, setReg] = useState(false);
    
    document.getElementById('body').classList.add(Style.home);

    const handleReg = (e) => {
        e.preventDefault();
        setReg(!reg);
    }
    return (
        <>
            {reg && (<CreateClient setReg={setReg}/>)}
            <section>
                <nav className={Style.nav}>
                    <div className={Style.classNavWrapper}>

                        <div className={Style.classNavMenu}>
                            <img className={Style.logo} src={hclogo} alt='logohc'/>
                            
                            <ul className={Style.classNavMenuUl}>
                                <li><a className={Style.a} 
                                onClick={
                                    (e) => {
                                        e.preventDefault();
                                        nav('/home', {state:state});
                                    }
                                }
                                href="#home">Home</a></li>
                                <li><a className={Style.a} href="#container">Techs</a></li>
                                <li><a className={Style.a} href="#usersList">Users List</a></li>
                                <li><a className={Style.a} href="#testimonials">Examples</a></li>
                            </ul>

                            {
                                state?.authenticate ?
                                    `Hello, ${state.clientName}.`
                                    :
                                    <a className={Style.button} href="#s" onClick={() => nav('/Login')}>
                                        Sign-in
                                    </a>
                            }
                            {
                                !state?.authenticate ?
                                    <a href="#s"
                                        onClick={handleReg}
                                        className={Style.button}
                                    >
                                        Sign-up
                                    </a>
                                    :
                                    <a href="#s" className={Style.button} onClick={() => nav('/Login')}>
                                        Logout
                                    </a>
                            }


                        </div>
                    </div>
                </nav>
            </section>
        </>
    )
}