import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import '../css/NovaDemanda.css';
import Botao from './Botao';
import { CadastrarUsuario } from '../utils/Usuario/CadastrarUsuario';

const FormularioUsuarioNovo = () => {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [tipoId, setTipoId] = useState('');
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/tipos/")
            .then((res) => res.json())
            .then((data) => setTipos(data))
            .catch((err) => console.error("Erro ao carregar tipos:", err));
    }, []);

    const handleSalvar = () => {
        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        const novoUsuario = { nome, senha, tipo: tipoId };
        CadastrarUsuario(novoUsuario, () => {
            setNome('');
            setSenha('');
            setConfirmarSenha('');
            setTipoId('');
        });
    };

    return (
        <div className="menu-suspenso p-3">
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio" style={{ marginTop: "4%" }}>Nome*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required placeholder="Digite o nome" />
                </Col>

                <Form.Label column sm={3} className="obrigatorio" style={{ marginTop: "2%" }}>Senha*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required placeholder="Digite a senha" />
                </Col>

                <Form.Label column sm={3} className="obrigatorio" style={{ marginTop: "2%" }}>Confirma a Senha*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required placeholder="Confirme a senha" />
                </Col>

                <Form.Label column sm={3} style={{ marginTop: "2%" }}>Perfil</Form.Label>
                <Col sm={9}>
                    <Form.Select value={tipoId} onChange={(e) => setTipoId(e.target.value)}>
                        <option value="">Selecione um perfil</option>
                        {tipos.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>
                                {tipo.nome}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Form.Group>

            <div className="text-end">
                <Botao texto="Salvar" onClick={handleSalvar} tipo="btn-salva" />
            </div>
        </div>
    );
};

export default FormularioUsuarioNovo;
