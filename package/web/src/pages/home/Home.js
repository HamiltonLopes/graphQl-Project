import Style from './Home.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import graphQlLogo from '../../assets/graphqllogo.png';
import apolloServerLogo from '../../assets/apollo-graphql-compact.svg';
import bootstrapLogo from '../../assets/Bootstrap_logo.svg.png';
import reactLogo from '../../assets/React-icon.svg.png';
import nodeJsLogo from '../../assets/logo-node-js-512.png';
import expressLogo from '../../assets/exlogo.png';
import htmlLogo from '../../assets/html5-logo.png';
import cssLogo from '../../assets/cssLogo.svg';


export default function Home() {
    const nav = useNavigate();
    const { state } = useLocation();

    return (
        <section>
            <NavBar />
            <div className={Style.classHomeContainer}>

                <h2 className={Style.classHomeH2}>Home</h2>
                <div id='container' className={Style.container}>
                    {state?.authenticate ?
                        <>
                            <h4 className={Style.classHomeH4}>You are in!</h4>
                            <h1 className={Style.classHomeH1}>{`Wellcome, ${state?.clientName}!!!!!`}</h1>
                        </> :
                        <h1 className={Style.classHomeH1}>Wellcome!!!</h1>}

                    <p className={Style.text}>Techs that have been used in this application:</p>
                    <div className={Style.div}>
                    <p className={Style.text}>Front-End:</p>
                        <div className={Style.card}>
                            <img className={Style.cardImg} src={reactLogo} alt="logo ReactJS" />
                            <p>ReactJS</p>
                        </div>
                        <div className={Style.card}>
                            <img className={Style.cardImg} src={bootstrapLogo} alt="logo Bootstrap" />
                            <p>Bootstrap</p>
                        </div>
                        <div className={Style.card}>
                            <img className={Style.cardImg} src={htmlLogo} alt="logo HTML" />
                            <p>HTML 5</p>
                        </div>
                        <div className={Style.card}>
                            <img className={Style.cardImg} src={cssLogo} alt="logo CSS" />
                            <p>CSS MODULES</p>
                        </div>
                    </div>
                    <div className={Style.div}>
                        <p className={Style.text}>Query Language:</p> 
                        <div className={Style.card}>
                            <img className={Style.cardImg} src={graphQlLogo} alt="logo graphQl" />
                            <p>GraphQl</p>
                        </div>
                    </div>
                    <div className={Style.div}>
                    <p className={Style.text}>Back-End:</p> 
                        <div className={Style.card}>
                            <img className={Style.cardImg} src={nodeJsLogo} alt="logo NodeJS" />
                            <p>NodeJS</p>
                        </div>
                        <div className={Style.card}>
                            <img className={Style.cardImg} src={apolloServerLogo} alt="logo apollo" />
                            <p>Apollo Server</p>
                        </div>
                        <div className={Style.card}>
                            <img className={Style.cardImg} src={expressLogo} alt="logo ExpressJS" />
                            <p>ExpressJS</p>
                        </div>
                    </div>

                </div>
                <button id='usersList' className={`${Style.classHomeButton} ${Style.button}`} type='button' onClick={(e) => { e.preventDefault(); nav('/clientList', { state: state }) }}>users list</button>
            </div>
        </section>
    );
}  