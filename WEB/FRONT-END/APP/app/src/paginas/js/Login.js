import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import '../css/BackCroud.css';
import '../css/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Senha:', senha);
    };

    return (
        <div className="back-croud">
            <Container className="login-container">
                <Card className="login-box">
                    <Card.Body>
                        <h2 className="text-center">Login</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Digite seu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button  type="submit" style={{backgroundColor:'#FA7530'}} className="w-100">
                                Entrar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Login;