import React, { useState } from "react";
import { Form, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../css/BackCroud.css';
import '../css/Login.css'; 
import Botao from '../../componentes/js/Botao';
import logoImg from '../../componentes/Img/logo1.png';
import { autenticarUsuario } from '../../componentes/utils/login/autenticarUsuario ';

const Login = () => {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sucesso = await autenticarUsuario(nome, senha);
        if (sucesso) {
            navigate("/dashboard"); // ou outra rota
        } else {
            alert("Usuário ou senha inválidos.");
        }
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

