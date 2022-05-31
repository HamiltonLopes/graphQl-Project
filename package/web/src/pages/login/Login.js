import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from "react-apollo";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  FormFeedback
} from 'reactstrap';

import Style from './Login.module.css';
import { gql } from 'graphql-tag';

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
  const [password, setPassword] = useState(null);
  const [getClientResult, clientResult] = useLazyQuery(CLIENT); //trocar por useQuery

  console.log(clientResult?.data?.findByEmail, clientEmail, clientResult?.data?.findByEmail?.password);

  useEffect(() => {
    if (clientEmail) {
      getClientResult({ //trocar por fetch more
        variables: {
          clientEmail,
        },
        fetchPolicy: 'network-only',
      });
    }
  }, [clientEmail,password]);

  useEffect(() => {
    if (!(clientResult.data === undefined) && !(clientResult?.data?.findByEmail === null)) {
      console.log("Resultado da busca:", clientResult.data, password);
      if (clientResult?.data?.findByEmail?.password === password) {
        console.log(`ENTREI!!!, BEM VINDO ${clientResult.data.findByEmail.name} email é ${clientEmail}`);
        navigate('/home', { state: { clientName: clientResult.data.findByEmail.name, authenticate: true } });
      } else {
        //Senha Errada
        document.getElementById('exampleEmail').classList.remove('is-invalid');
        document.getElementById('examplePassword').classList.add('is-invalid');
      }
    } else if (inputEmail.current.value) {
      //Email Errado
      document.getElementById('exampleEmail').classList.add('is-invalid');
      document.getElementById('examplePassword').classList.remove('is-invalid');

    }
  }, [clientResult]);

  const handleAuthenticate = () => {
    setClientEmail(inputEmail.current.value);
    setPassword(inputPassword.current.value);
  }

  const handleBack = () => {
    navigate('/home');
  }

  return (
    <div className={Style.classLogInDiv}>
      <h1 className={Style.classLogInP}>Login</h1>
      <Form inline className={Style.classLogInform}>
        <FormGroup className="mb-3 me-sm-2 mb-sm-0">
          <Label
            className="me-sm-2"
            for="exampleEmail"
          >
            Email address
          </Label>
          <div className={Style.inputContainer}>
            <Input
              id="exampleEmail"
              name="email"
              innerRef={inputEmail}
              placeholder="something@idk.cool"
              type="email"
            />
            <FormFeedback tooltip>
              Incorrect Email!
            </FormFeedback>
          </div>
          <FormText>We'll never share your email with anyone else.</FormText>
        </FormGroup>
        <FormGroup className="mb-3 me-sm-2 mb-sm-0">
          <Label
            className={`me-sm-2  ${Style.classLoginPassLabel}`}
            for="examplePassword"
          >
            Password
          </Label>
          <div className={Style.inputContainer}>

            <Input
              id="examplePassword"
              name="password"
              innerRef={inputPassword}
              placeholder="don't tell!"
              type="password"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('examplePassword').classList.remove('is-invalid');
              }}
            />
            <FormFeedback id="a" tooltip>
              Incorrect Password!
            </FormFeedback>
          </div>
        </FormGroup>
        <Button className={Style.classLoginButton} type="submit" onClick={(e) => { e.preventDefault(); handleAuthenticate(); }}>
          Submit
        </Button>
        <Button className={Style.classLoginButton} type="submit" onClick={(e) => { e.preventDefault(); handleBack(); }}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}