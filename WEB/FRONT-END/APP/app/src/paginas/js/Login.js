import React, { useState } from "react";
import { Form, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importando para navegação
import '../css/BackCroud.css';
import '../css/Login.css';
import Botao from '../../componentes/js/Botao';
import logoImg from '../../componentes/asserts/logo1.png';

const Login = () => {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nome:', nome);
        console.log('Senha:', senha);
        
        // Redireciona para a Home após login
        navigate('/home');
    };

    return (
        <div className="back-croud">
            <Container className="login-container">
                <Card className="login-box" style={{ background: "#2F2F31", color: "#FA7530" }}>
                    <Card.Body>
                        <div className="text-center">
                            <div className="logo"> 
                                <img 
                                    className="logo-imag"
                                    src={logoImg} 
                                    alt="Logo"
                                    style={{ maxWidth: "80%", height: "auto" }}
                                />
                            </div>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite seu nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
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

                            <Botao texto="Entrar" tipo="btn-entrar w-100" onClick={handleSubmit} />
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Login;
