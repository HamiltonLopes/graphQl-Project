import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery} from "react-apollo";

import Style from './Login.module.css';
import {gql} from 'graphql-tag';

const CLIENT = gql`
    query findByEmail($clientEmail: String!){
        findByEmail(email: $clientEmail){
            id
            name
            email
            password
        }
    }
`;

export default function Login() {
  const inputEmail = useRef('');
  const inputPassword = useRef('');
  const navigate = useNavigate();
  const [clientEmail, setClientEmail] = useState(null);
  var password = null;
  const [getClientResult, clientResult] = useLazyQuery(CLIENT);

  // console.log(clientResult?.data?.findByEmail, clientEmail, clientResult?.data?.findByEmail?.password);

  useEffect(()=>{
    if(clientEmail){
      // console.log(clientEmail);
      getClientResult({
        variables:{
          clientEmail,
        },
        fetchPolicy: "cache-first",
      });
    }
  },[clientEmail]);

  useEffect(()=>{
    if(!(clientResult.data === undefined)){
      console.log("Resultado da busca:",clientResult.data, password);
      if(clientResult?.data?.findByEmail?.password === inputPassword.current.value){
        console.log(`ENTREI!!!, BEM VINDO ${clientResult.data.findByEmail.name}`);
        navigate('/home',{state:{clientName:clientResult.data.findByEmail.name,authenticate:true}});
      }else{
        console.log("EMAIL OU SENHA ERRADA!!!");
      }
    }
  },[clientResult]);

  const  handleAuthenticate =  () =>{
    setClientEmail(inputEmail.current.value);
  }

  return (
    <>
      <form className={Style.classLogInform} >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" ref={inputEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor='exampleInputPassword1' className="form-label">Password</label>
          <input type="password" ref={inputPassword} className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={(e) => {e.preventDefault();handleAuthenticate();}}>Submit</button>
      </form>
    </>
  );
}