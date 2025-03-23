import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from "reactstrap";
import { login } from "../../actions/auth.actions";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { login: authContextLogin } = useAuth(); // Get the login function from context

    const loginHandler = (ev: React.FormEvent) => {
        ev.preventDefault();
        if (!email || !senha) {
            return;
        }

        const payload = {
            email: email,
            senha: senha,
        };

        dispatch(login(payload));
        authContextLogin();
        navigate("/home");
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 w-50">
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <Form onSubmit={loginHandler}>
                                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                                    <Label htmlFor="exampleEmail" className="mr-sm-2">
                                        E-mail
                                    </Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="exampleEmail"
                                        placeholder="email@email.com"
                                        onChange={(ev) => setEmail(ev.currentTarget.value)}
                                    />
                                </FormGroup>
                                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                                    <Label htmlFor="exampleSenha" className="mr-sm-2">
                                        Senha
                                    </Label>
                                    <Input
                                        type="password"
                                        name="senha"
                                        id="exampleSenha"
                                        placeholder="Senha"
                                        onChange={(ev) => setSenha(ev.currentTarget.value)}
                                    />
                                </FormGroup>
                                <Button type="submit" color="primary">
                                    Login
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;