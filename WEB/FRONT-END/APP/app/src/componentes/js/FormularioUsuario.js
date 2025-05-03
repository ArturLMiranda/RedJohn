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
    const [tipo, setTipo] = useState('');
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        fetch('/api/tipos/')  // Ajuste conforme necessário
            .then(res => res.json())
            .then(data => setTipos(data))
            .catch(err => console.error("Erro ao carregar tipos:", err));
    }, []);

    const limparCampos = () => {
        setNome('');
        setSenha('');
        setConfirmarSenha('');
        setTipo('');
        setUsuarioId(null);
    };

    const handleEditarUsuario = () => {
        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        const dados = {
            nome,
            senha,
            confirmar_senha: confirmarSenha,
            tipo
        };
        EditarUsuario(usuarioId, dados, () => {
            alert("Usuário editado com sucesso!");
            limparCampos();
        });
    };

    const handleDeletarUsuario = () => {
        if (usuarioId) {
            DeletarUsuario(usuarioId, () => {
                alert("Usuário deletado com sucesso!");
                limparCampos();
            });
        } else {
            console.warn('Nenhum usuário selecionado para deletar.');
        }
    };

    return (
        <div className="menu-suspenso p-3">
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio" style={{ marginTop: "4%" }}>Nome*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required placeholder="Digite o nome" style={{ marginTop: "4%" }} />
                </Col>

                <Form.Label column sm={3} className="obrigatorio" style={{ marginTop: "2%" }}>Senha*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required placeholder="Digite a senha" style={{ marginTop: "2%" }} />
                </Col>

                <Form.Label column sm={3} className="obrigatorio" style={{ marginTop: "2%" }}>Confirma a Senha*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required placeholder="Confirme a senha" style={{ marginTop: "2%" }} />
                </Col>

                <Form.Label column sm={3} style={{ marginTop: "2%" }}>Perfil</Form.Label>
                <Col sm={3}>
                    <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ marginTop: "6%" }}>
                        <option value="">Selecione um perfil</option>
                        {tipos.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
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
