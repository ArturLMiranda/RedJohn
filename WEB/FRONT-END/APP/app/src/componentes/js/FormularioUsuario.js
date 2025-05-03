import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import '../css/NovaDemanda.css';
import Botao from './Botao';
import { EditarUsuario } from '../utils/Usuario/EditarUsuario';
import { DeletarUsuario } from '../utils/Usuario/DeletarUsuario';

const FormularioUsuario = () => {
    const [usuarioId, setUsuarioId] = useState(null);
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

    const limparCampos = () => {
        setNome('');
        setSenha('');
        setConfirmarSenha('');
        setTipoId('');
        setUsuarioId(null);
    };

    const handleEditarUsuario = () => {
        const dados = {
            nome,
            senha,
            confirmar_senha: confirmarSenha,
            tipo: tipoId
        };
        EditarUsuario(usuarioId, dados, limparCampos);
    };

    const handleDeletarUsuario = () => {
        if (usuarioId) {
            DeletarUsuario(usuarioId, limparCampos);
        } else {
            console.warn('Nenhum usuário selecionado para deletar.');
        }
    };

    return (
        <div className="menu-suspenso p-3">
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio">Nome*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </Col>

                <Form.Label column sm={3} className="obrigatorio">Senha*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </Col>

                <Form.Label column sm={3} className="obrigatorio">Confirma a Senha*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
                </Col>

                <Form.Label column sm={3}>Perfil</Form.Label>
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
                <Botao texto="Excluir" onClick={handleDeletarUsuario} tipo="btn-delete" />
                <Botao texto="Salvar" onClick={handleEditarUsuario} tipo="btn-salva" />
            </div>
        </div>
    );
};

export default FormularioUsuario;
