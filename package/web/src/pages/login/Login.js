import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from "react-apollo";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText
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
  var password = null;
  const [getClientResult, clientResult] = useLazyQuery(CLIENT);

  // console.log(clientResult?.data?.findByEmail, clientEmail, clientResult?.data?.findByEmail?.password);

  useEffect(() => {
    if (clientEmail) {
      getClientResult({
        variables: {
          clientEmail,
        },
        fetchPolicy: "cache-first",
      });
    }
  }, [clientEmail]);

  useEffect(() => {
    if (!(clientResult.data === undefined)) {
      console.log("Resultado da busca:", clientResult.data, password);
      if (clientResult?.data?.findByEmail?.password === inputPassword.current.value) {
        console.log(`ENTREI!!!, BEM VINDO ${clientResult.data.findByEmail.name}`);
        navigate('/home', { state: { clientName: clientResult.data.findByEmail.name, authenticate: true } });
      } else {
        console.log("EMAIL OU SENHA ERRADA!!!");
      }
    }
  }, [clientResult]);

  const handleAuthenticate = () => {
    setClientEmail(inputEmail.current.value);
  }

  return (
    <div className={Style.teste}>
      <Form inline className={Style.classLogInform}>
        <FormGroup className="mb-3 me-sm-2 mb-sm-0">
          <Label
            className="me-sm-2"
            for="exampleEmail"
          >
            Email address
          </Label>
          <Input
            id="exampleEmail"
            name="email"
            innerRef={inputEmail}
            placeholder="something@idk.cool"
            type="email"
          />
          <FormText>We'll never share your email with anyone else.</FormText>
        </FormGroup>
        <FormGroup className="mb-3 me-sm-2 mb-sm-0">
          <Label
            className={`me-sm-2  ${Style.classLoginPassLabel}`}
            for="examplePassword"
          >
            Password
          </Label>
          <Input
            id="examplePassword"
            name="password"
            innerRef={inputPassword}
            placeholder="don't tell!"
            type="password"
          />
        </FormGroup>
        <Button className={Style.classLoginButton} type="submit" onClick={(e) => { e.preventDefault(); handleAuthenticate(); }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}