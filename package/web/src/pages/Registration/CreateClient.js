import { gql } from 'graphql-tag';
import { useMutation } from 'react-apollo';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Col,
    Input,
    Button
} from 'reactstrap';
import Style from './CreateClient.module.css';


const CREATE_CLIENT = gql`
    mutation CREATE_CLIENT($name: String!, $email: String!, $password: String){
        createClient(input: {
            name: $name,
            email: $email,
            password: $password
        }){
            id
            name
            email
            password
        }
    }
`;

export default function CreateClient({ setReg }) {
    var clickOverForm = false;
    const nav = useNavigate();
    const [REF_NAME, REF_EMAIL, REF_PASSWORD] = [0, 1, 2];
    const [createClient] = useMutation(CREATE_CLIENT);
    const formInputs = useRef([]); //.current[i]
    document.getElementById('body').classList.add(Style.modal);
    const handleSubmit = () => {
        console.log(formInputs.current[REF_NAME].value);
        createClient({
            variables: {
                name: formInputs.current[REF_NAME].value,
                email: formInputs.current[REF_EMAIL].value,
                password: formInputs.current[REF_PASSWORD].value,
            }
        }).then(console.log);

        document.getElementById('form').reset();
        setReg(false);
        document.getElementById('body').classList.remove(Style.modal);
        nav('/Login');
    };

    const handleClickOnFormContainer = () => {
        if (!clickOverForm)
            clickOverForm = !clickOverForm;
    }

    const handleBack = () => {
        if (!clickOverForm) {
            document.getElementById('body').classList.remove(Style.modal);
            setReg(false);
            console.log('volta');
        } else {
            clickOverForm = !clickOverForm;
        }
    }


    return (
        <>
            <div className={Style.bg} onClick={handleBack}>
                <div className={Style.container} onClick={handleClickOnFormContainer}>
                    <h2 className={Style.h}>REGISTER</h2>
                    <Form id="form">
                        <FormGroup row>
                            <Label for="name" sm={2}>Name</Label>
                            <Col sm={10}>
                                <Input type="name" name="email" innerRef={el => formInputs.current[REF_NAME] = el} id="name" placeholder="Your Name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="email" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" innerRef={el => formInputs.current[REF_EMAIL] = el} id="email" placeholder="mail@example.com" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="password" sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input type="password" name="password" innerRef={el => formInputs.current[REF_PASSWORD] = el} id="password" placeholder="Secret Password" />
                            </Col>
                        </FormGroup>

                        <div className={Style.buttons}>
                            <Button className={Style.button} onClick={(e) => { e.preventDefault(); handleSubmit(); }} type="submit" >
                                Submit
                            </Button>
                            <Button className={Style.button} type="reset" >
                                Clear
                            </Button>
                            <Button className={Style.button} type="button" onClick={handleBack}>
                                Cancelar
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}