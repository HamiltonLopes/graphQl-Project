import Style from './Home.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';


export default function Home() {
    const nav = useNavigate();
    const { state } = useLocation();
    

    return (
        <section className={Style.home}>
            <NavBar />
            <div className={Style.classHomeContainer}>
                
                <h2 className={Style.classHomeH2}>Home</h2>
                {state?.authenticate ? 
                    <>
                    <h4 className={Style.classHomeH4}>You are in!</h4>
                    <h1 className={Style.classHomeH1}>{`Wellcome!!!!! ${state?.clientName}`}</h1> 
                    </>:
                    <h1 className={Style.classHomeH1}>Wellcome!!!</h1>}
                <button className={`${Style.classHomeButton} ${Style.button}`} type='button' onClick={(e) => { e.preventDefault(); nav('/clientList',{state:state}) }}>users list</button>
            </div>
        </section>
    );
}  